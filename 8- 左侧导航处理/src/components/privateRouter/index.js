import React from 'react'
import {  Route ,Redirect } from 'react-router-dom'
import {getToken} from "../../utils/session";

const  PrivateRouter =({component:Component,...rest})=> {

       // getToken 获取token 判断是否登录

       return (
           <Route {...rest} render={routeProps=>(

               getToken() ? <Component {...routeProps} /> :  <Redirect to='/'/>
           )} />
       )
}

export default PrivateRouter


