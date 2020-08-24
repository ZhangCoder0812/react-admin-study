import React ,{Component} from 'react';
import {Switch } from 'react-router-dom'

// 私有组件方法
import PrivateRouter from '../privateRouter'

// 自动化工程
const components=[]
const files = require.context("../../views/",true,/\.js$/)
files.keys().map(key=>{
    // 过滤到首页和登录页
    if(key.includes('./index/') || key.includes('./login/')){
        return false
    }
    const splitName = key.split('.')
    const jsonObj = {}
    const path = `/index${splitName[1].toLowerCase()}`
    const component = files(key).default
    jsonObj.path=path
    jsonObj.component=component
    components.push(jsonObj)
})
console.log(components);

class ContainerMain extends Component{

    render(){
        return(
           <Switch>
               {
                   components.map(item=>{
                    return <PrivateRouter exact path={item.path} key={item.path} component={item.component} />
                   })
               }
           </Switch>
        )
    }

}

export default ContainerMain;
