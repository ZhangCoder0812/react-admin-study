import React ,{Component,Fragment} from 'react'
import { Form, Input,Button,message,Modal} from 'antd';
import {TableList,TableDelete} from "@/api/common";
import requestUrl from '@/api/requestUrl'
import PropTypes from 'prop-types'
import TableBasis from './Table' 

class TableComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            keyWords:'',
            pageNumber:1,
            pageSize:10,
            data:[],
            loadingTable:false,
            total:0,
            checkboxValue:[],
            // 弹窗
            modalVisible:false,
            modalConfirmLoading:false
        }
    }

    componentDidMount() {
        this.loadData()
        // 调用父组件方法 返回子组件实例
        this.props.onRef(this)
    }

    loadData=()=>{
        const { pageNumber,pageSize,keyWords} = this.state
        const requestData ={
            url:requestUrl[this.props.config.url],
            method:this.props.config.method,
            data:{
                pageNumber,
                pageSize
            }
        }
        if(keyWords) {requestData.data.name=keyWords}
        this.setState({loadingTable:true})
        TableList(requestData).then(res=>{
            const {data , total} = res.data.data
            if(data){
                this.setState({
                    data,
                    total
                })
            }
            this.setState({loadingTable:false})
        }).catch(err=>{
             this.setState({loadingTable:false})
        })
    }

    //复选框
    onCheckBox=(checkboxValue)=>{
        this.setState({checkboxValue})
    }

    //分页
    onChangeCurrentPage =(value)=>{
        this.setState({
            pageNumber:value
        },()=>{
            this.loadData()
        })
    }

    OnShowSizeChange=(value,pageSize)=>{
        this.setState({
            pageNumber:1,
            pageSize 
        },()=>{
            this.loadData()
        })
    }
    
      // 删除
      onHandleDelete(id){
        this.setState({
            modalVisible:true,
        })
        if(id){ // 单个删除
            this.setState({
                checkboxValue: id ? [id] :[] 
            }) 
        }
    }

     // 删除弹窗
     modalThen=()=>{
         if(!this.state.checkboxValue.length){
           return   message.info('请选择删除的数据')
         }
        this.setState({modalConfirmLoading:true})
        const id = this.state.checkboxValue.join()
        const requestData ={
            url:requestUrl[`${this.props.config.url}Delete`],
            method:this.props.config.method,
            data:{
                id
            }
        }
        TableDelete(requestData).then(res=>{
            message.info(res.data.message)
            this.setState({
                modalConfirmLoading:false,
                modalVisible:false,
                id:'',
            })
            // 删除成功 重新加载数据
            this.loadData()
        })
    }

   // 搜索
   onFinish = values => {
    this.setState({
        pageNumber:1,
        pageSize:10,
        keyWords:values.name,
    })
    this.loadData()
   };

    render() {

        const { data,loadingTable ,total} =this.state
        const { thead ,checkbox ,rowKey ,batchButton} =this.props.config
        const rowSelection = {
            onChange:this.onCheckBox
        }
        return (
            <Fragment>
                <Form  layout="inline" onFinish={this.onFinish}>
                    <Form.Item label='部门名称' name="name">
                        <Input  placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
               <div className='table-wrap'>
                    <TableBasis 
                            columns={thead} 
                            dataSource={data}
                            total={total}
                            changePageCurrent={this.onChangeCurrentPage}
                            changePageSize={this.OnShowSizeChange}
                            batchButton={true}
                            handleDelete={()=>this.onHandleDelete() }
                            rowSelection={checkbox ? rowSelection : null}
                            rowKey={rowKey}
                        ></TableBasis>
                </div>
                <Modal
                 title='提示'
                 visible={this.state.modalVisible}
                 onOk={this.modalThen}
                 onCancel={()=>{this.setState({modalVisible:false})}}
                 onText='确认'
                 cancelText='取消'
                 confirmLoading={this.state.modalConfirmLoading}
                >
                    <p className='text-center color-red'>确认删除？</p>
                </Modal>
            </Fragment>        
        )
    }
}

//  校验类型
TableComponent.propTypes={
   config:PropTypes.object,
} 
// 配置默认值 父组件若传就会被覆盖
TableComponent.defaultProps={
    batchButton:false,
 } 
 
export  default  TableComponent;
