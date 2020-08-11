import React ,{Component,Fragment} from 'react'
import {Link} from 'react-router-dom'
// antd
import { Form, Input, Button ,Switch,message,Modal} from 'antd';
//接口
import {Delete,Status} from "@/api/department";

import TableComponent from '@/components/tableData'

class DepartmentList extends Component{

    constructor(props){
        super(props)
        this.state={
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
            // 弹窗
            confirmLoading:false, //删除按钮loading
            visible:false,
            id:'',
            tableConfig:{
                url:'departmentList',
                method:'post',
                checkbox:true,
                rowKey:'id',
                batchButton:false,
                thead:[
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
            }
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
        const {tableConfig} = this.state

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
                    <TableComponent batchButton={true} config={tableConfig}/>
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
