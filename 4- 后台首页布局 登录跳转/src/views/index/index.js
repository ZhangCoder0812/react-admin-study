import React , {Component} from 'react'
import { Layout } from 'antd';
import './index.scss'
import LayoutHeader from './components/header'
import LayoutAside from './components/aside'
const { Header, Sider, Content } = Layout;


class Index extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return (
            <Layout className='layout-wrap'>
                <Header className='layout-header'>
                    <LayoutHeader />
                </Header>
                <Layout>
                    <Sider width='250px'>
                        <LayoutAside />
                    </Sider>
                    <Content className='layout-main'>
                        Content
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index