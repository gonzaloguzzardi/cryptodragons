import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './views/landing/landing.js';
import Dragons from './views/dragons/dragons.js';
import Register from './views/landing/register.js';

class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/dragons" component={Dragons}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
