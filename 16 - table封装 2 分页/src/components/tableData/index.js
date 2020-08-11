import React ,{Component,Fragment} from 'react'
import { Button,Table,Pagination,Row,Col} from 'antd';
import {TableList} from "@/api/common";
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
            total:0
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
    onCheckBox=(selectedRowKeys)=>{
        this.setState({selectedRowKeys})
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

    render() {

        const { data,loadingTable ,total} =this.state
        const { thead ,checkbox ,rowKey ,batchButton} =this.props.config
        const rowSelection = {
            onChange:this.onCheckBox
        }
        return (
            <Fragment>
             <Table pagination={false} loading={loadingTable} rowKey={rowKey || 'id'}  columns={thead} dataSource={data} rowSelection={checkbox ? rowSelection : null} bordered/>
            
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
