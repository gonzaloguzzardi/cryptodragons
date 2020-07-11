import React, { Component } from 'react';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input  from '@material-ui/core/Input';
import FormLabel  from '@material-ui/core/FormLabel';
import { _transferDragon, _mapAccounts, _accountsAreMapped } from '../../services/dragons'

import MainchainAPI from '../../services/blockchain-interaction/mainchain';
import SidechainAPI from '../../services/blockchain-interaction/sidechain';

import './dragons.scss';

const namespace = 'ui-view-dragons';

class Dragons extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sideAccount: '0xfee39fad945754831b59b92a1a8339f65358792d',
      mainAccount: '0x28863498efede12296888f7ca6cf0b94974fbdbc',

      sideDragons: [],
      mainDragons: [],
      sidechainGatewayDragons: [],
      mainchainGatewayDragons: [],

      accountsAreMapped: false
    };

    this.getDragonsFromSide();
    this.getDragonsFromOracle();
    this.getDragonsFromMain();
    this.accountsAreMapped();
  }

  getDragonsFromMain = () => {
    MainchainAPI.getMyDragons().then(mainDragons => this.setState({ mainDragons }));
  };

  getDragonsFromSide = () => {
    SidechainAPI.getMyDragons().then(sideDragons => this.setState({ sideDragons }));
  };

  getDragonsFromOracle = () => {};

  buyDragonInSideChain = () => {
    SidechainAPI.createDragon().then(res => {
      console.log("RESPONSEE", res);
      this.getDragonsFromSide();
    });
  }

  buyDragonInMainChain = () => {
    MainchainAPI.createDragon().then(res => {
      console.log("RESPONSEE", res);
      this.getDragonsFromMain();
    });
  }

  transferFromSideToMain = dragonId => (
      _transferDragon(dragonId,true)
      .then(() => {
          this.getDragonsFromOracle();
          this.getDragonsFromSide();
      })
      .catch((err) => { throw err.response.data })
  );

  transferFromMainToSide = dragonId => (
      _transferDragon(dragonId,false)
      .then(() => {
          this.getDragonsFromOracle();
          this.getDragonsFromMain();
      })
      .catch((err) => { throw err.response.data })
  );

  mapAccounts = () => {
    _mapAccounts(this.state.mainAccount,this.state.sideAccount)
  }

  accountsAreMapped = () => {
    _accountsAreMapped(this.state.mainAccount, this.state.sideAccount, this.state.sideAccount)
      .then(res => this.setState({ accountsAreMapped: res.data }));
  } 

  onChangeMainAccount = event => {
    this.setState({ mainAccount: event.target.value });
  }

  onChangeSideAccount = event => {
    this.setState({ sideAccount: event.target.value });
  }

  showMapButton = () => {
    return this.state.accountsAreMapped ? (
      <Button variant="contained" color="primary" className="botonVerde" onClick={this.mapAccounts}>
        Map Accounts
      </Button>
    ) : (
      <Button variant="contained" color="primary" onClick={this.mapAccounts}>
        Map Accounts
      </Button>
    );
  } 

  render = () => (
    <div className={`${namespace}__container-div`}>

      { /* Map accounts */ }
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <FormLabel>
            <b>SideChain Account:</b>&nbsp;
            <Input
              type="text"
              name="sideAccount"
              className={`${namespace}__container-div__map-acounts__input`}
              defaultValue={this.state.sideAccount}
              onChange={this.onChangeSideAccount}
            />
          </FormLabel>
        </Grid>
          <Grid item>
            {this.showMapButton()}
        </Grid>
        <Grid item>
          <FormLabel>
            <b>MainChain Account:</b>&nbsp;
            <Input
              type="text"
              name="mainAccount"
              className={`${namespace}__container-div__map-acounts__input`}
              defaultValue={this.state.mainAccount}
              onChange={this.onChangeMainAccount}
            />
          </FormLabel>
        </Grid>
      </Grid>

      { /* Buttons - Buy Dragons in blockchains */ }
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.buyDragonInSideChain}>
            Buy New Dragon in Sidechain
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.buyDragonInMainChain}>
            Buy New Dragon in MainChain
          </Button>
        </Grid>
      </Grid>

      { /* Sidechain dragons - Mainchain dragons */ }
      <Grid container justify="center" spacing={2}>
        <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
          <h3 className={`${namespace}__chains-headings`}>Side Chain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.sideDragons.map(value => (
                <Grid key={value} item>
                  <Dragon
                    location="side"
                    id={value}
                    transferMethod={this.transferFromSideToMain}
                  />
                </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
          <h3 className={`${namespace}__chains-headings`}>Main Chain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.mainDragons.map(value => (
                  <Grid key={value} item>
                    <Dragon
                        location="main"
                        id={value}
                        transferMethod={this.transferFromMainToSide}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      { /* Oracle dragons */ }
      <Grid container spacing={2}>
          <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
            <h3 className={`${namespace}__oracle-heading`}>Sidechain Gateway Dragons</h3>
            <Grid container justify="center" spacing={2}>
              {this.state.sidechainGatewayDragons.map(value => (
                <Grid key={value} item>
                  <Dragon id={value["uid"]} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
            <h3 className={`${namespace}__oracle-heading`}>Mainchain Gateway Dragons</h3>
            <Grid container justify="center" spacing={2}>
              {this.state.mainchainGatewayDragons.map(value => (
                <Grid key={value} item>
                  <Dragon id={value["uid"]} location="oracle" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
    </div>
  );
}

export default Dragons;
