import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from './dragon.svg';
import './landing.css';

export class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="Landing-header">
          <img src={logo} className="Landing-logo" alt="logo" />
          <h2>Welcame to Cripto Dragon</h2>
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