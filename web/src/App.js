import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/landing/landing.js';
import Dragons from './components/dragons/dragons.js';

class App extends Component {
  render() {
    return (      
      <React.Fragment>
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/dragons" component={Dragons}/>
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
