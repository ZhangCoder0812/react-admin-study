import React , { Component,Fragment} from 'react'
import {  Table,Row,Col,Pagination,Button} from 'antd'
import PropTypes from 'prop-types'


class TableBasis extends Component {

    render(){
       
        const { columns,dataSource,rowKey,total,changePageCurrent,changePageSize,batchButton,handleDelete,rowSelection} = this.props
        return(
            <Fragment>
                <Table  rowKey={rowKey} pagination={false} rowSelection={rowSelection} columns={columns} dataSource={dataSource}   bordered/>
                <div className='spacing30'></div> 
                <Row>
                  <Col span={8}>
                     { batchButton &&  <Button onClick={handleDelete } >批量删除</Button> }   
                  </Col>    
                  <Col span={16}>
                    <Pagination
                        className='pull-right'
                        total={total}
                        showSizeChanger
                        showQuickJumper
                        showTotal={total => `Total ${total} items`}
                        onChange={changePageCurrent}
                        onShowSizeChange={changePageSize}
                        />
                    </Col> 
                </Row> 
            </Fragment> 
        )
    }

}

//  校验类型
TableBasis.propTypes={
    columns:PropTypes.array,
    dataSource:PropTypes.array,
    total:PropTypes.number,
    changePageCurrent:PropTypes.func,
    changePageSize:PropTypes.func,
    batchButton:PropTypes.bool,
    rowSelection:PropTypes.object,
    rowKey:PropTypes.string,
 } 
 // 配置默认值 父组件若传就会被覆盖
 TableBasis.defaultProps={
    columns:[],
    dataSource:[],
    batchButton:true,
    rowKey:'id',
  } 
  

export default TableBasis