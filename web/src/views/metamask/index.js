import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MetamaskHelper from '../../services/metamask';
import MainchainAPI from '../../services/blockchain-interaction/mainchain';

import './index.scss';

const namespace = 'ui-view-metamask';

export class Metamask extends Component {
  constructor(props) {
    super(props);

    this.state = { metamask: null };
    MetamaskHelper.getMetamaskHelper().then(metamask => this.setState({ metamask }));
    MetamaskHelper.onAccountChange(this.setNewAccount);
  };

  setNewAccount = account => this.setState({
    metamask: {
      ...this.state.metamask,
      account,
    }
  });

  render = () => (
    <div className={`${namespace}__div-container`}>
      <h1 className={`${namespace}__div-container__header`}>Integration with metamask</h1>
      <hr/>
      <span>Use this account please: <b>28863498efede12296888f7ca6cf0b94974fbdbc</b></span><br/>
      <span>Private key: <b>dff874fa1f53c713f31b5831c25fe56657808bd0b379a7f28442af8a6de79cb2</b></span>
      <hr/>
      <Button variant="contained" color="primary" href="" onClick={() => MetamaskHelper.loadMainchainAccount()} disabled={!!this.state.metamask && !!this.state.metamask.account}>
        Connect BFA account
      </Button>

      <FormGroup>
        <FormControlLabel control={<Checkbox checked={!!this.state.metamask}/>} label="Metamask Loaded" />
        <FormControlLabel control={<Checkbox checked={!!this.state.metamask && !!this.state.metamask.account}/>} label={`Current Account: ${!!this.state.metamask && this.state.metamask.account}`} />
        <FormControlLabel control={<Checkbox checked={!!this.state.metamask && !!this.state.metamask.netId}/>} label={`Network ID: ${!!this.state.metamask && this.state.metamask.netId}`} />
      </FormGroup>


      <Button variant="contained" color="primary" href="" onClick={() => MainchainAPI.createDragon().then(res => console.log("RESPONSEE", res))}>
        Create dragon Mainchain
      </Button>
    </div>
  );
}

export default Metamask;
