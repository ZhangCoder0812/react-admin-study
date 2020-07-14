import React ,{Component} from 'react';
import {BrowserRouter,Switch ,Route } from 'react-router-dom'

import User from  '../../views/user'
import Add from  '../../views/add'

// 私有组件方法
import PrivateRouter from '../privateRouter'


class ContainerMain extends Component{

    render(){
        return(
           <Switch>
               <PrivateRouter exact path="/index/user/list"  component={User}   />
               <PrivateRouter exact path="/index/user/add"  component={Add}   />
           </Switch>
        )
    }

}

export default ContainerMain;
