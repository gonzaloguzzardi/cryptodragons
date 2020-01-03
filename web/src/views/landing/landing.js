import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assets/dragon.svg';

import './landing.css';

export class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-header">
          <img src={logo} className="landing-logo" alt="logo" />
          <h2>Welcome to Cripto Dragon</h2>
        </div>
        <p></p>
        <Button variant="contained" color="primary" href="dragons">
          Start
        </Button>
      </div>
    );
  }
}

export default Landing;
