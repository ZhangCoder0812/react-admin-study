import React , { Component } from 'react'
import {message, Select,Form,Input, InputNumber, Radio,Button} from 'antd'

class FormCom extends Component{

    constructor(props){
        super(props)
        this.state={
           mesPreix:{
               "Input":"请输入",
               "Radio":"请选择",
               "Select":"请选择",
               "InputNumber":"请选择",
           }
        }
    }

    rules=(item)=>{
        const { mesPreix} =this.state
        let   rules =[]
        const message = item.message || `${mesPreix[item.type]}${item.label}`
        if(item.required){
            rules.push({required:true,message })
        }
        if(item.rules && item.rules.length>0){
            rules=rules.concat(item.rules)
        }
        return rules
    }

    inputElem=(item)=>{
       const rules = this.rules(item)
       return (
        <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
            <Input style={item.style} placeholder={item.placeholder} />
        </Form.Item>
       )
    }

    slectElem=(item)=>{
        const rules = this.rules(item)
        return (
         <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
             <Select style={item.style}  placeholder={item.placeholder}>
                {
                    item.options && item.options.map(elem=>{
                    return <option value={elem.value} key={elem.value}>{elem.label}</option>
                    })
                }
             </Select>
         </Form.Item>
        )
     }

     inputNumberElem=(item)=>{
        const rules = this.rules(item)
        return (
         <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
             <InputNumber min={item.min} max={item.max} />
         </Form.Item>
        )
     }

     radioElem=(item)=>{
        const rules = this.rules(item)
        return (
         <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
              <Radio.Group  >
                 {
                    item.options && item.options.map(elem=>{
                    return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                    })
                }
                    </Radio.Group>
         </Form.Item>
        )
     } 


    initFormItem =()=>{
          const { formItem } = this.props
          if(!formItem || (formItem && formItem.length===0)){
              return false ;
          }
          const formList = []
          formItem.map(item=>{
              if(item.type ==='Input'){
                formList.push(this.inputElem(item))
              }
              if(item.type ==='Select'){
                formList.push(this.slectElem(item))
              }
              if(item.type ==='InputNumber'){
                formList.push(this.inputNumberElem(item))
              } 
              if(item.type ==='Radio'){
                formList.push(this.radioElem(item))
              }  
          })
          console.log(formList)
          return formList
    }

    onSubmit=(value)=>{
        this.props.onSubmit(value)
    }

    render(){
        return (
            <Form ref="form" onFinish={this.onSubmit} {...this.props.formLayout}>

                {
                    this.initFormItem()
                }
                <Form.Item >
                    <Button loading={this.state.loading} type='primary' htmlType='submit'>确定</Button>
                </Form.Item>
            </Form>
        )
    }
}


export default FormCom