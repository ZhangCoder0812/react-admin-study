import React , {Component,Fragment} from 'react'
import {Link} from 'react-router-dom'

import { Menu, } from 'antd';
import { UserOutlined, } from '@ant-design/icons';

// 路由
import Router from '../../router/index'

const { SubMenu } = Menu;


class AsideMenu extends Component{
    constructor(props){
        super(props)
        this.state={

        }
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

    render(){
        return (
            <Fragment>
                <Menu
                    theme='dark'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
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

export default AsideMenu