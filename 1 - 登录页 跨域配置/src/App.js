import React ,{Component} from 'react';
import {BrowserRouter,Switch ,Route } from 'react-router-dom'
import Login from './views/login'

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
             </Switch>
         </BrowserRouter>
     )

   }

 }

export default App;
