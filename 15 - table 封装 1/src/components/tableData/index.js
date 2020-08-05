import React ,{Component} from 'react'
import { Form, Input, Button ,Table,Switch,message,Modal} from 'antd';
import {TableList} from "@/api/common";
import requestUrl from '@/api/requestUrl'
class TableComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            pageNumber:1,
            pageSize:10,
            data:[],
            loadingTable:false,
        }
    }

    componentDidMount() {
        this.loadData()
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

    render() {

        const { data,loadingTable } =this.state
        const { thead ,checkbox ,rowKey} =this.props.config
        const rowSelection = {
            onChange:this.onCheckBox
        }
        return (
            <Table loading={loadingTable} rowKey={rowKey || 'id'}  columns={thead} dataSource={data} rowSelection={checkbox ? rowSelection : null} bordered/>
        )
    }
}

export  default  TableComponent;
