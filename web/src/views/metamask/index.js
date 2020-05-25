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
        <h1>Integration with metamask</h1>

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
