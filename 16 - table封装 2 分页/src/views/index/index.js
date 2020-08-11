import React , {Component} from 'react'
import { Layout } from 'antd';
import './index.scss'
import LayoutHeader from './components/header'
import LayoutAside from './components/aside'

// 内容区组件
import ContainerMain from '../../components/containerMenu'

const { Header, Sider, Content } = Layout;



class Index extends Component{
    constructor(props){
        super(props)
        this.state={
            collapsed:false
        }
    }

    componentDidMount(){
        const collapsed = JSON.parse(sessionStorage.getItem('collapsed'))
        this.setState({collapsed})
    }

    toggleCollapsed =()=>{
        const collapsed = !this.state.collapsed
        this.setState({collapsed})
        sessionStorage.setItem('collapsed',collapsed)
    }

    render(){
        return (
            <Layout className='layout-wrap'>
                <Header className='layout-header' >
                    <LayoutHeader  collapsed={this.state.collapsed}  toggle={this.toggleCollapsed} />
                </Header>
                <Layout>
                    <Sider width='250px' collapsed={this.state.collapsed}>
                        <LayoutAside />
                    </Sider>
                    <Content className='layout-main'>
                        <ContainerMain />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index