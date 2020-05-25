import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assets/dragon.svg';

import './index.scss';

const namespace = 'ui-view-metamask';

export class Metamask extends Component {
  render() {
    return (
      <div className={`${namespace}__div-container`}>
        <h2>Integration with metamask</h2>
        <Button variant="contained" color="primary" href="">
          No hago nada
        </Button>
      </div>
    );
  }
}

export default Metamask;
