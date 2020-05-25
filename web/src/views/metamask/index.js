import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getCurrentAccount, getNetworkID, loadBFAAccount, metamaskLoaded } from '../../services/metamask'

import './index.scss';

const namespace = 'ui-view-metamask';

export class Metamask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainchainAccount: getCurrentAccount(),
    };
  }

  setMainchainAccount = address => {
    this.setState({ mainchainAccount: address });
  }

  render() {
    return (
      <div className={`${namespace}__div-container`}>
        <h1 className={`${namespace}__div-container__header`}>Integration with metamask</h1>
        <hr/>
        <span>Use this account please: <b>28863498efede12296888f7ca6cf0b94974fbdbc</b></span><br/>
        <span>Private key: <b>dff874fa1f53c713f31b5831c25fe56657808bd0b379a7f28442af8a6de79cb2</b></span>
        <hr/>

        <FormGroup>
          <FormControlLabel control={<Checkbox checked={!!metamaskLoaded()}/>} label="Metamask Loaded" />
          <FormControlLabel control={<Checkbox checked={!!this.state.mainchainAccount}/>} label={`Current Account: ${this.state.mainchainAccount}`} />
          <FormControlLabel control={<Checkbox checked={!!getNetworkID()}/>} label={`Network ID: ${getNetworkID()}`} />
        </FormGroup>

        <Button variant="contained" color="primary" href="" onClick={() => loadBFAAccount(this.setMainchainAccount)} disabled={!!this.state.mainchainAccount}>
          Connect BFA account
        </Button>
      </div>
    );
  }
}

export default Metamask;
