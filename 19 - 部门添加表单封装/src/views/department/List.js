import React ,{Component,Fragment} from 'react'
import {Link} from 'react-router-dom'
// antd
import {Button ,Switch,message} from 'antd';
//接口
import {Delete,Status} from "@/api/department";

import TableComponent from '@/components/tableData'

class DepartmentList extends Component{

    constructor(props){
        super(props)
        this.state={
            id:'',
            tableConfig:{
                url:'departmentList',
                method:'post',
                checkbox:true,
                rowKey:'id',
                batchButton:true,
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
                                <Button  onClick={()=>this.delete(rowData.id)} >删除</Button>
                                {/* 
                                    这里点击删除调用的是子组件中的删除方法，要获取子组件的实例
                                    1. 在子组件中调用父组件的方法 把子组件传给父组件
                                    2. 通过实例调用子组件的方法
                                */}
                            </div>
                        }},
                ],
            }
        }
    }

 

    // 获取子组件实例
    getChildRef=(ref)=>{
      this.tableComponent = ref
    }

    //删除
    delete=(id)=>{
        this.tableComponent.onHandleDelete(id)
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
   
    render(){
        const {tableConfig} = this.state

        return(
            <Fragment>
                <TableComponent onRef={this.getChildRef}batchButton={true} config={tableConfig}/>
            </Fragment>
        )
    }
}

export default DepartmentList
