import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Dragon from '../dragons/dragon.js';

import MainchainAPI from '../../services/blockchain-interaction/mainchain';
import SidechainAPI from '../../services/blockchain-interaction/sidechain';

import './index.scss';

const namespace = 'ui-view-migration';

export class Migration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sideAccount: '0xfee39fad945754831b59b92a1a8339f65358792d',
      mainAccount: '0x28863498efede12296888f7ca6cf0b94974fbdbc',

      sideDragons: [],
      mainDragons: [],
      sidechainGatewayDragons: [],
      mainchainGatewayDragons: [],

    };

  }  

  render = () => (
    <div className={`${namespace}__div-container`}>
      <h1 className={`${namespace}__div-container__header`}>Migration</h1>
      <hr/>
      <span>Use this mainchain account please: <b>28863498efede12296888f7ca6cf0b94974fbdbc</b></span><br/>
      <span>Private key: <b>dff874fa1f53c713f31b5831c25fe56657808bd0b379a7f28442af8a6de79cb2</b></span><br/>
      <span>localhost:8545</span><br/>

      <hr/>

      { /* Actions */ }
      { /* Mainchain Actions */ }
      <Button variant="contained" color="primary" href="" onClick={() => MainchainAPI.getMyDragons().then(mainDragons => this.setState({ mainDragons }))}>
        Get dragons Mainchain
      </Button>
      <hr/>
      <Grid item xs={12} className={`${namespace}__container-grid__dragons-items`}>
        <Grid container spacing={1}>
          {this.state.mainDragons.map(value => (
          <Grid key={value} item>
            <Dragon
              location="side"
              id={value}
            />
          </Grid>
          ))}
        </Grid>
      </Grid>
      <hr/>
      <Button variant="contained" color="primary" href="" onClick={() => MainchainAPI.createDragon().then(res => console.log("RESPONSEE", res)) } >
        Create dragon Mainchain
      </Button>
      <hr/>

      { /* Sidechain Actions */ }
      <Button variant="contained" color="primary" href="" onClick={() => SidechainAPI.getMyDragons().then(sideDragons => this.setState({ sideDragons }))}>
        Get dragons Sidechain
      </Button>
      <hr/>
      <Grid item xs={12} className={`${namespace}__container-grid__dragons-items`}>
        <Grid container spacing={1}>
          {this.state.sideDragons.map(value => (
          <Grid key={value} item>
            <Dragon
              location="side"
              id={value}
            />
          </Grid>
          ))}
        </Grid>
      </Grid>
      <hr/>
      <Button variant="contained" color="primary" href="" onClick={() => SidechainAPI.createDragon().then(res => console.log("RESPONSEE", res))}>
        Create dragon Sidechain
      </Button>
      <hr/>
    </div>
  );
}

export default Migration;
