import React ,{Component,Fragment} from 'react'
// antd
import { Form, Input, Button ,Table,Switch,message} from 'antd';
//接口
import {GetList,Delete} from "@/api/department";

class DepartmentList extends Component{

    constructor(props){
        super(props)
        this.state={
            pageNumber:1,
            pageSize:10,
            keyWords:'',  // 搜索关键字
            selectedRowKeys:[],//复选框数据
            columns:[
                {title:'部门名称',dataIndex:"name",key:'name'},
                {title:'禁启用',dataIndex:"status",key:'status',render:(text,rowData)=>{
                    return <Switch checkedChildren='启用' unCheckedChildren='禁用' defaultChecked={rowData.status=='1' ? true : false}></Switch>
                    }},
                {title:'人员数量',dataIndex:"number",key:'number'},
                {title:'操作',dataIndex:"operate",key:'operate',width:215,render:(text,rowData)=>{
                        return <div className='inline-button'>
                            <Button type="primary"  >编辑</Button>
                            <Button  onClick={()=>this.onHandleClick(rowData.id)} >删除</Button>
                        </div>
                    }},
            ],
            data:[]

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
    onHandleClick(id){
        if(!id) return ;
        Delete({id}).then(res=>{
            message.info(res.data.message)
            this.loadData()
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
        GetList(requestData).then(res=>{
            const data = res.data.data.data
            if(data){
                this.setState({
                    data
                })
            }
        })
    }

    //复选框
    onCheckBox=(selectedRowKeys)=>{
        this.setState({selectedRowKeys})
    }

    render(){
        const {columns,data} = this.state
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
                    <Table  rowSelection={rowSelection} rowKey='id' columns={columns} dataSource={data} bordered/>
                </div>


            </Fragment>
        )
    }
}

export default DepartmentList
