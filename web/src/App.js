import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './views/landing/landing.js';
import Dragons from './views/dragons/dragons.js';

class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/dragons" component={Dragons}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
