import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './views/landing/landing';
import Dragons from './views/dragons/dragons';
import Metamask from './views/metamask';
import Migration from './views/migration';

class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/dragons" component={Dragons}/>
          <Route path="/metamask" component={Metamask}/>
          <Route path="/migration" component={Migration}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
