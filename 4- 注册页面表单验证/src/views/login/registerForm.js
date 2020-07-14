import React , {Component,Fragment} from 'react'
import { Form, Input, Button  , Row, Col} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss'
import Code from "../../components/code"
import {validate_pass} from "../../utils/validate";
import { Register} from "../../api/account";

class RegisterForm extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            code:'',
            module:'register'
        }
    }

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


    onFinish = values => {
        const {username, password, code} =this.state
        const  requestData = {username, password, code}
        console.log(requestData);
        Register().then(res=>{
            console.log(values)
        }).catch(err=>{
            console.log(err)
        })
    };
    toggleForm=()=>{
        this.props.switchForm('login')
    }
    render(){
        const {username,module} = this.state
        return(
                <Fragment>
                    <div className='form-header'>
                        <h4 className='column'>注册</h4>
                        <span onClick={ this.toggleForm}>登录</span>
                    </div>
                    <div className='form-content'>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: '邮箱不能为空!' },
                                    { type: 'email', message: '邮箱格式不正确' },
                                ]}
                            >
                                <Input  value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    ({getFieldValue})=>({
                                        validator(rule,value){
                                            if(!validate_pass(value)) {
                                                return Promise.reject('请输入6-12位数字+字母密码!')
                                            }
                                            if(value && value!==getFieldValue('passwords')){
                                                return Promise.reject('两次密码不一致!')
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                    onChange = {this.inputChangePassword}
                                />
                            </Form.Item>

                            <Form.Item
                                name="passwords"
                                rules={[
                                    { required: true, message: '确认密码不能为空' },
                                    ({getFieldValue})=>({
                                        validator(rule,value){
                                            if(!validate_pass(value)) {
                                                return Promise.reject('请输入6-12位数字+字母密码!')
                                            }
                                            if(value && value!==getFieldValue('password')){
                                                return Promise.reject('两次密码不一致!')
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                    ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Passwords"
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
                                            placeholder="请输入验证码'"
                                            onChange = {this.inputChangeCode}
                                        />
                                    </Col>
                                    <Col span={9}>
                                        <Code username={username} module={module}/>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" block htmlType="submit" className="login-form-button">
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Fragment>

        )
    }
}

export default RegisterForm