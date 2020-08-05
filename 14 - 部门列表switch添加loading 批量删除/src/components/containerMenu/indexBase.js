import React ,{Component} from 'react';
import {BrowserRouter,Switch ,Route } from 'react-router-dom'

import UserList from  '../../views/user/List'
import UserAdd from  '../../views/user/Add'

// 部门相关组件
import DepartmentList from  '../../views/department/List'
import DepartmentAdd from  '../../views/department/Add'

// 私有组件方法
import PrivateRouter from '../privateRouter'


class ContainerMain extends Component{

    render(){
        return(
           <Switch>
               <PrivateRouter exact path="/index/user/list"  component={UserList}   />
               <PrivateRouter exact path="/index/user/add"  component={UserAdd}   />
               <PrivateRouter exact path="/index/department/list"  component={DepartmentList}   />
               <PrivateRouter exact path="/index/department/add"  component={DepartmentAdd}   />
           </Switch>
        )
    }

}

export default ContainerMain;
