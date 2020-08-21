import React ,{Component,Fragment} from 'react'
import { Button,Table,Pagination,Row,Col,message,Modal} from 'antd';
import {TableList,TableDelete} from "@/api/common";
import requestUrl from '@/api/requestUrl'
import PropTypes from 'prop-types'
 
class TableComponent extends Component {

    constructor(props){
        super(props)
        this.state={
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
        const { pageNumber,pageSize} = this.state
        const requestData ={
            url:requestUrl[this.props.config.url],
            method:this.props.config.method,
            data:{
                pageNumber,
                pageSize,
            }
        }
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

    render() {

        const { data,loadingTable ,total} =this.state
        const { thead ,checkbox ,rowKey ,batchButton} =this.props.config
        const rowSelection = {
            onChange:this.onCheckBox
        }
        return (
            <Fragment>
             <Table pagination={false} loading={loadingTable} rowKey={rowKey || 'id'}  columns={thead} dataSource={data} rowSelection={checkbox ? rowSelection : null} bordered/>
                <div className='spacing30'></div> 
                <Row>
                  <Col span={8}>
                     { batchButton &&  <Button onClick={()=>this.onHandleDelete() } >批量删除</Button> }   
                  </Col>    
                  <Col span={16}>
                    <Pagination
                        className='pull-right'
                        total={total}
                        showSizeChanger
                        showQuickJumper
                        showTotal={total => `Total ${total} items`}
                        onChange={this.onChangeCurrentPage}
                        onShowSizeChange={this.OnShowSizeChange}
                        />
                    </Col> 
                </Row> 
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
