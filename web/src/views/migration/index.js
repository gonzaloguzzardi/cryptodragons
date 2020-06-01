import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import MainchainAPI from '../../services/blockchain-interaction/mainchain';
import SidechainAPI from '../../services/blockchain-interaction/sidechain';

import './index.scss';

const namespace = 'ui-view-migration';

export class Migration extends Component {
  constructor(props) {
    super(props);
  };

  render = () => (
    <div className={`${namespace}__div-container`}>
      <h1 className={`${namespace}__div-container__header`}>Migration</h1>
      <hr/>
      <span>Use this account please: <b>28863498efede12296888f7ca6cf0b94974fbdbc</b></span><br/>
      <span>Private key: <b>dff874fa1f53c713f31b5831c25fe56657808bd0b379a7f28442af8a6de79cb2</b></span>
      <hr/>

      <Button variant="contained" color="primary" href="" onClick={() => MainchainAPI.createDragon().then(res => console.log("RESPONSEE", res))}>
        Create dragon Mainchain
      </Button>
      <hr/>
      <Button variant="contained" color="primary" href="" onClick={() => SidechainAPI.createDragon().then(res => console.log("RESPONSEE", res))}>
        Create dragon Sidechain
      </Button>
    </div>
  );
}

export default Migration;
