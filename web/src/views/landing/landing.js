import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assets/dragon.svg';

import './landing.scss';

const namespace = 'ui-view-landing';

export class Landing extends Component {
  render() {
    return (
      <div className={`${namespace}__div-container`}>
        <div className={`${namespace}__header`}>
          <img src={logo} className={`${namespace}__header-logo`} alt="logo" />
          <h2>Welcome to CryptoDragons</h2>
        </div>
        <Button variant="contained" color="primary" href="dragons">
          Start
        </Button>
      </div>
    );
  }
}

export default Landing;