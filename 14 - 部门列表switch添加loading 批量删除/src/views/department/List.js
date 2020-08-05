import React ,{Component,Fragment} from 'react'
import {Link} from 'react-router-dom'
// antd
import { Form, Input, Button ,Table,Switch,message,Modal} from 'antd';
//接口
import {GetList,Delete,Status} from "@/api/department";

class DepartmentList extends Component{

    constructor(props){
        super(props)
        this.state={
            loadingTable:false,
            pageNumber:1,
            pageSize:10,
            keyWords:'',  // 搜索关键字
            selectedRowKeys:[],//复选框数据
            columns:[
                {title:'部门名称',dataIndex:"name",key:'name'},
                {title:'禁启用',dataIndex:"status",key:'status',render:(text,rowData)=>{
                    return <Switch
                        loading={rowData.id==this.state.id}
                        onChange={()=>this.onHandleSwitch(rowData)}
                        checkedChildren='启用'
                        unCheckedChildren='禁用'
                        defaultChecked={rowData.status=='1' ? true : false}>

                    </Switch>
                    }},
                {title:'人员数量',dataIndex:"number",key:'number'},
                {title:'操作',dataIndex:"operate",key:'operate',width:215,render:(text,rowData)=>{
                        return <div className='inline-button'>
                            <Button  type="primary"  >
                                <Link to={{pathname:'/index/department/add',state:{id:rowData.id}}}>编辑</Link>
                            </Button>
                            <Button  onClick={()=>this.onHandleDelete(rowData.id)} >删除</Button>
                        </div>
                    }},
            ],
            data:[],
            // 弹窗
            confirmLoading:false, //删除按钮loading
            visible:false,
            id:'',

        }
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



    // 删除
    onHandleDelete(id){

        if(!id){
            //批量删除
            if(this.state.selectedRowKeys.length===0) return false;
            id=this.state.selectedRowKeys.join() //默认以,拼接
            console.log(id);
        }
        //列表删除
        this.setState({
            visible:true,
            id
        })
    }

    //禁启用
    onHandleSwitch=(data)=>{
        if(!data.status) return ;
        const requestData ={
            id:data.id,
            status:data.status==='1' ? false :true,
        }
        this.setState({
            id:data.id,
        })
        Status(requestData).then(res=>{
            message.info(res.data.message)
            this.loadData()
            this.setState({id:'',})
        }).catch(err=>{
            this.setState({id:'',})
        })

    }

    // 复选框
    componentDidMount() {
       this.loadData()
    }

    loadData=()=>{
        const { keyWords,pageNumber,pageSize} = this.state
        const requestData ={pageNumber, pageSize,}
        if(keyWords){
            requestData.name = keyWords
        }
        this.setState({loadingTable:true})
        GetList(requestData).then(res=>{
            const data = res.data.data.data
            if(data){
                this.setState({data})
            }
            this.setState({loadingTable:false})
        }).catch(err=>{
            this.setState({loadingTable:false})
        })
    }

    //复选框
    onCheckBox=(selectedRowKeys)=>{
        this.setState({selectedRowKeys})
    }

    // 删除弹窗
    modalThen=()=>{
        this.setState({confirmLoading:true})
        Delete({id:this.state.id}).then(res=>{
            message.info(res.data.message)
            this.loadData()
            this.setState({
                confirmLoading:false,
                visible:false,
                id:'',
                selectedRowKeys:[],
            })
        })
    }

    render(){
        const {columns,data,loadingTable} = this.state
        const rowSelection = {
            onChange:this.onCheckBox
        }
        return(
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
                    <Table loading={loadingTable} rowSelection={rowSelection} rowKey='id' columns={columns} dataSource={data} bordered/>
                    <Button onClick={()=>this.onHandleDelete() } >批量删除</Button>
                </div>
                <Modal
                 title='提示'
                 visible={this.state.visible}
                 onOk={this.modalThen}
                 onCancel={()=>{this.setState({visible:false})}}
                 onText='确认'
                 cancelText='取消'
                 confirmLoading={this.state.confirmLoading}
                >
                    <p className='text-center color-red'>确认删除？</p>
                </Modal>

            </Fragment>
        )
    }
}

export default DepartmentList
