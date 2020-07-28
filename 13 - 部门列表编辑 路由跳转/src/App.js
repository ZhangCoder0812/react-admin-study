import React ,{Component} from 'react';
import {BrowserRouter,Switch ,Route } from 'react-router-dom'
import Login from './views/login'
import Index from './views/index'

// 私有组件方法
import PrivateRouter from './components/privateRouter'

 class App extends Component{
   constructor(props){
     super(props)
     this.state={}
   }
   render(){
     return(
         <BrowserRouter>
             <Switch>
                 <Route component={Login} exact path="/"></Route>
                 {/* 或者使用 render 可以写表达式 加载对应组件
                 <Route render={ false ? 11 : <Login />} exact path="/"></Route>
                 */}

                 {/*  私有组件处理 */}
                 <PrivateRouter component={Index}   path="/index" />

             </Switch>
         </BrowserRouter>
     )

   }

 }

export default App;
