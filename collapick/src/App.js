import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import CreateTask from './CreateTask';
import Home from './Home';
import {Navigation} from './Navigation';

/*Paths between react files*/

class App extends Component {
render(){
return (
<BrowserRouter>
<Navigation/>
<Switch>
<Route path="/" component={Home} exact></Route>             
<Route path='/CreateTask' component={CreateTask}></Route>
</Switch>
</BrowserRouter>
    );
  }
}
export default App;