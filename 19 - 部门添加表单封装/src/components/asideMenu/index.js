import React , {Component,Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'

import { Menu, } from 'antd';
import { UserOutlined, } from '@ant-design/icons';

// 路由
import Router from '../../router/index'

const { SubMenu } = Menu;


class AsideMenu extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedKeys:[],
            openKeys:[]
        }
    }

    componentDidMount(){
        // 设置当前高亮菜单
        const {pathname} = this.props.location
        const menuKey = pathname.split('/').slice(0,3).join('/')
        const menuHigh ={
            selectedKeys:pathname,
            openKeys:menuKey
        }
        this.selectMenuHigh(menuHigh)
    }

    // 有子集菜单
    renderSubMenu({key,title,child}){
          return (
              <SubMenu key={key} icon={<UserOutlined />} title={title}>
                  {
                    child && child.map(item=>{
                        return  item.child && item.child.length ? this.renderSubMenu(item) : this.renderMenu(item)
                    })
                  }
              </SubMenu>
          )
    }

    // 无子集菜单
    renderMenu({key,title}){
        return <Menu.Item key={key}>
                    <Link to={key}>{title}</Link>
                </Menu.Item>
    }

    // 点击菜单
    selectMenu=({item , key ,keyPath})=>{
        const menuHigh ={
            selectedKeys:key,
            openKeys:keyPath[keyPath.length-1]
        }
        this.selectMenuHigh(menuHigh)
    }

    // 设置菜单高亮
    selectMenuHigh = ({selectedKeys,openKeys})=>{
        this.setState({
            selectedKeys:[selectedKeys],
            openKeys:[openKeys]
        })
    }

    openMenu=(openKeys)=>{
        this.setState({
            openKeys:[openKeys[openKeys.length-1]]
        })
    }

    render(){
        const {selectedKeys,openKeys} = this.state
        return (
            <Fragment>
                <Menu
                    onOpenChange={this.openMenu}
                    onClick = {this.selectMenu}
                    theme='dark'
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100%', borderRight: 0 }}
                >

                    {
                        Router && Router.map(firstItem=>{
                            return firstItem.child && firstItem.child.length ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }

                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(AsideMenu)