import React , {Component} from 'react'
import {GetCode} from "../../api/account";
import {  Button  ,message  } from 'antd';
import {validate_email} from '../../utils/validate' // 密码正则验证

// 定时器 定义在外面便于全局拿到
let timer = null

class Code extends Component{
    constructor(props){
        super(props)
        this.state={
            usename:'',
            module:props.module,
            code_button_disabled:true,
            code_button_text:'获取验证码',
            code_button_loading:false,
        }
    }

    // 获取父组件传来的值跟新到自己身上
    componentWillReceiveProps(value){
        let {username} = value
        this.setState({
            username,
            code_button_disabled: !validate_email(username)
        })
    }

    // 销毁时执行 清楚定时器
    componentWillUnmount(){
        clearInterval(timer)
    }


    // 获取验证码
    getCode =()=>{
        let {username} =this.state

        if(!username){
            message.warning('用户名不能为空')
        }
        this.setState({
            code_button_loading:true,
            code_button_text:'发送中',
        })
        const requestData = {
            username,
            module:this.state.module
        }
        GetCode(requestData).then(res=>{
            this.countDown()
            message.success(res.data.message)
        }).catch(err=>{
            this.setState({
                code_button_loading:false,
                code_button_text:'再次获取',
            })
        })
    }

    // 倒计时
    countDown=()=>{
        let sec =5
        this.setState({
            code_button_loading:false,
            code_button_disabled:true,
            code_button_text:`${sec}s`,
        })
        timer = setInterval(()=>{
            sec--
            if(sec <= 0) {
                this.setState({
                    code_button_disabled:false,
                    code_button_text:'再次获取',
                })
                clearInterval(timer)
                return false
            }
            this.setState({
                code_button_text:`${sec}s`,
            })
        },1000)

    }




    render(){
        const {code_button_disabled,code_button_loading,code_button_text} = this.state
        return (
            <Button type="danger"  loading={code_button_loading} block disabled={code_button_disabled} onClick={this.getCode}>
                {code_button_text}
            </Button>
        )
    }
}

export default Code