import React , {Component,Fragment} from 'react'
import { Form, Input, Button  ,message  , Row, Col} from 'antd';
import { UserOutlined, LockOutlined,  } from '@ant-design/icons';
import './index.scss'
import {validate_password,validate_email} from '../../utils/validate' // 密码正则验证
import {Login,GetCode} from "../../api/account";

class LoginForm extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            code_button_disabled:true,
            code_button_text:'获取验证码',
            code_button_loading:false,
        }
    }

    // 登录
    onFinish = values => {
        Login().then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    };

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
             module:'login'
         }
         GetCode().then(res=>{
             this.countDown()
             console.log(res)
         }).catch(err=>{
             this.setState({
                 code_button_loading:false,
                 code_button_text:'再次获取',
             })
         })
    }
    // 输入事件
    inputChange=(e)=>{
         let {value} = e.target
         this.setState({
            username:value
        })
    }
    // 倒计时
    countDown=()=>{
        let timer = null
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

    toggleForm=()=>{
       this.props.switchForm('register')
    }
    render(){
         const {username,code_button_disabled,code_button_loading,code_button_text} = this.state
        const _this= this
        return(

                <Fragment>
                    <div className='form-header'>
                        <h4 className='column'>登录</h4>
                        <span onClick={ this.toggleForm}>账号注册</span>
                    </div>
                    <div className='form-content'>
                        <Form
                            name="normal_login"
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: '邮箱不能为空!' },
                                   /* {type:'email',message:'邮箱格式不正确!'}*/
                                    ({getFieldValue})=>({
                                        validator(rule,value){
                                            if(validate_email(value)){
                                                _this.setState({
                                                    code_button_disabled:false
                                                })
                                                return Promise.resolve()
                                            }else {
                                                _this.setState({
                                                    code_button_disabled:true
                                                })
                                                return Promise.reject('邮箱格式不正确!')
                                            }
                                          }
                                        })
                                    ]}
                            >
                                <Input  value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: '密码不能为空!' },
                                   /* {min:6,message:'长度不能小于6位'},
                                    {max:20,message:'长度不能大于20位'},*/
                                    {pattern:validate_password,message:"请输入6-12位数字+字母密码"}
                                    ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item
                                name="code"
                                rules={[
                                    { required: true, message: '验证码不能为空！' },
                                    {len:6,message:'请输入6位验证码！'}
                                    ]}
                            >
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            placeholder="code"
                                        />
                                    </Col>
                                    <Col span={9}>
                                        <Button type="danger"  loading={code_button_loading} block disabled={code_button_disabled} onClick={this.getCode}>
                                            {code_button_text}
                                            </Button>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" block htmlType="submit" >
                                   登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Fragment>

        )
    }
}

export default LoginForm