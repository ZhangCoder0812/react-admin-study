import React , {Component,Fragment} from 'react'
import { Form, Input, Button  , Row, Col} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss'
class RegisterForm extends Component{
    onFinish = values => {
        console.log('Received values of form: ', values);
    };
    toggleForm=()=>{
        this.props.switchForm('login')
    }
    render(){
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
                            onFinish={()=>this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your Password!' },
                                    // 也可以用下面方式校验  用于复杂的校验
                                    // getFieldValue() 可以获取到其他输入框的值
                                    //     getFieldValue('username')   name属性
                                    ({ getFieldValue }) => ({ // 解构
                                        validator(rule, value) {
                                            if (getFieldValue('password')<6) {
                                                return Promise.reject('长度不能小于6位!');
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                    ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item
                                name="passwords"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Passwords"
                                />
                            </Form.Item>

                            <Form.Item
                                name="code"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            placeholder="code"
                                        />
                                    </Col>
                                    <Col span={9}>
                                        <Button type="danger" block>验证码</Button>
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