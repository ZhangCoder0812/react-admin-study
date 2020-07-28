import React , {Component,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import { Form, Input, Button  ,message  , Row, Col} from 'antd';
import { UserOutlined, LockOutlined,  } from '@ant-design/icons';
import './index.scss'
import {validate_password,validate_email} from '../../utils/validate' // 密码正则验证
import {Login,} from "../../api/account";
import {setToken , setUsername} from "../../utils/cookies";

import Code from "../../components/code"

// 密码加密
import Cryptojs from 'crypto-js'


class LoginForm extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            code:'',
            loading:false,
            module:'login',
        }
    }

    // 登录
    onFinish = values => {
        const {username, password, code} =this.state
        const  requestData = {
            username,
            password:Cryptojs.MD5(password).toString(),
            code
        }
        this.setState({
            loading:true
        })
        setTimeout(()=>{
            Login(requestData).then(res=>{
                const {data} =res
                message.success(data.message)
                setToken(data.data.token)
                setUsername(data.data.username)
                // 路由跳转
                this.props.history.push('/index')
            }).catch(err=>{
                console.log(err)
            })
            this.setState({
                loading:false
            })
        },3000)
    };


    // 输入事件
    inputChangeUsername=(e)=>{
        let {value} = e.target
        this.setState({
            username:value,
        })
    }
    inputChangePassword=(e)=>{
        let {value} = e.target
        this.setState({
            password:value,
        })
    }
    inputChangeCode=(e)=>{
        let {value} = e.target
        this.setState({
            code:value,
        })
    }


    toggleForm=()=>{
       this.props.switchForm('register')
    }
    render(){
         const {username,module,loading} = this.state
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
                                    ({getFieldValue})=>({
                                        validator(rule,value){
                                            if(validate_email(value)){
                                                return Promise.resolve()
                                            }else {
                                                return Promise.reject('邮箱格式不正确!')
                                            }
                                          }
                                     })
                                    ]}
                            >
                                <Input  value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                                    placeholder="Password"
                                    onChange={this.inputChangePassword}
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
                                            onChange={this.inputChangeCode}
                                        />
                                    </Col>
                                    <Col span={9}>
                                        <Code username={username} module={module}/>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" block htmlType="submit" loading={loading}>
                                   登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Fragment>

        )
    }
}

export default withRouter(LoginForm)