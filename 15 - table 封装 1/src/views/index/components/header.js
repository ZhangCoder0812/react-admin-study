import React , {Component} from 'react'
import './header.scss'
import {MenuFoldOutlined} from '@ant-design/icons'
import {validate_email} from "../../../utils/validate";


class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            collapsed:props.collapsed
        }
    }

    // 监听传来的参数 改变状态
    componentWillReceiveProps({collapsed}){

        this.setState({collapsed})
    }

    toggleMenu=()=>{
        this.props.toggle()
    }

    render(){
        const {collapsed} = this.state
        return (
            <div className={collapsed ? 'collapsed-close' : ''}>
                <h1 className='logo'>
                    <span>LOGO</span>
                </h1>
                <div className='header-wrap'>
                    <span className='collapsed-icon' onClick={this.toggleMenu}><MenuFoldOutlined /></span>
                </div>
            </div>
        )
    }
}

export default Header