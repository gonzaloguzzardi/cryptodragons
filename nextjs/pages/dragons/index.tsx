import React, { Component } from 'react';
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/layout'
import Dragon from '../../components/dragon';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input  from '@material-ui/core/Input';
import FormLabel  from '@material-ui/core/FormLabel';

// import MainchainAPI from '../../services/blockchain-interaction/mainchain';
// import SidechainAPI from '../../services/blockchain-interaction/sidechain';
// import { _getDragonsFromOracle } from '../../services/oracle';

import viewStyles from './view.module.scss';

const namespace = 'ui-view-dragons';

const GAS_DEFAULT_VALUE = 350000;

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

    // this.updateDragons();
    // setInterval(this.updateDragons, 7000);

    // this.accountsAreMapped();
  }

  // updateDragons = () => {
  //   this.getDragonsFromMain();
  //   this.getDragonsFromSide();
  //   this.getDragonsFromOracle();
  // };

  // getDragonsFromMain = () => {
  //   MainchainAPI.getMyDragons(GAS_DEFAULT_VALUE).then(mainDragons => this.setState({ mainDragons }));
  // };

  // getDragonsFromSide = () => {
  //   SidechainAPI.getMyDragons(GAS_DEFAULT_VALUE).then(sideDragons => this.setState({ sideDragons }));
  // };

  // getDragonsFromOracle = () => {
  //   _getDragonsFromOracle().then(result => {
  //     this.setState({
  //       sidechainGatewayDragons: result[0]['sidechain-gateway-results'],
  //       mainchainGatewayDragons: result[1]['mainchain-gateway-results'],
  //     })
  //   })
  // };

  // buyDragonInSideChain = () => {
  //   SidechainAPI.createDragon(GAS_DEFAULT_VALUE).then(res => {
  //     console.log("[SIDECHAIN]: Dragon create response", res);
  //   });
  // }

  // buyDragonInMainChain = () => {
  //   MainchainAPI.createDragon(GAS_DEFAULT_VALUE).then(res =>
  //     console.log("[MAINCHAIN]: Dragon create response", res)
  //   );
  // }

  // transferFromSideToMain = dragonId => (
  //   SidechainAPI.transferDragon(dragonId, GAS_DEFAULT_VALUE).then(res =>
  //     console.log("[SIDECHAIN]: Transfer to Mainchain response", res)
  //   )
  // );

  // transferFromMainToSide = dragonId => (
  //   MainchainAPI.transferDragon(dragonId, GAS_DEFAULT_VALUE).then(res =>
  //     console.log("[MAINCHAIN]: Transfer to Sidechain response", res)
  //   )
  // );

  // mapAccounts = () => {
  //   Promise.all([
  //     SidechainAPI.mapAccountToMainchainAccount(this.state.mainAccount, GAS_DEFAULT_VALUE),
  //     MainchainAPI.mapAccountToSidechainAccount(this.state.sideAccount, GAS_DEFAULT_VALUE),
  //   ]).then(values => {
  //     console.log("[SIDECHAIN]: MAPEO EN SIDECHAIN", values[0]);
  //     console.log("[MAINCHAIN]: MAPEO EN MAINCHAIN", values[1]);
  //     this.accountsAreMapped();
  //   });
  // }

  // accountsAreMapped = () => {
  //   console.log("Are accounts mapped?");
  //   Promise.all([
  //     MainchainAPI.areAccountsMapped(this.state.sideAccount, GAS_DEFAULT_VALUE),
  //     SidechainAPI.areAccountsMapped(this.state.mainAccount, GAS_DEFAULT_VALUE),
  //   ]).then(values => {
  //     console.log("MAPEO CUENTAS [SideInMain, MainInSide]", values);
  //     this.setState({ accountsAreMapped: values[0] && values[1] })
  //   });
  // } 

  // onChangeMainAccount = event => this.setState({ mainAccount: event.target.value });

  // onChangeSideAccount = event => this.setState({ sideAccount: event.target.value });

  render = () => (
    <Layout>
      {/*
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
            {this.state.accountsAreMapped ? (
              <Button variant="contained" disabled>
                Accounts Mapped! 😁 🎉
              </Button>
              ) : (
              <Button variant="contained" color="primary" onClick={this.mapAccounts}>
                Map Accounts
              </Button>
            )}
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

      Buttons - Buy Dragons in blockchains
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

      Sidechain dragons - Mainchain dragons
      <Grid container justify="center" spacing={2}>
        <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
          <h3 className={`${namespace}__chains-headings`}>Side Chain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.sideDragons ? this.state.sideDragons.map(value => (
                  <Grid key={value} item>
                    <Dragon
                      location="side"
                      id={value}
                      transferMethod={this.transferFromSideToMain}
                    />
                  </Grid>
                )) : null }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
          <h3 className={`${namespace}__chains-headings`}>Main Chain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.mainDragons ? this.state.mainDragons.map(value => (
                  <Grid key={value} item>
                    <Dragon
                      location="main"
                      id={value}
                      transferMethod={this.transferFromMainToSide}
                    />
                  </Grid>
                )) : null }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      Oracle dragons
      <Grid container spacing={2}>
        <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
          <h3 className={`${namespace}__oracle-heading`}>Sidechain Gateway Dragons</h3>
          <Grid container justify="center" spacing={2}>
            {this.state.sidechainGatewayDragons ? this.state.sidechainGatewayDragons.map(value => (
              <Grid key={value} item>
                <Dragon
                  location="side"
                  id={value["uid"]}
                />
              </Grid>
            )) : null }
          </Grid>
        </Grid>
        <Grid item xs={6} className={`${namespace}__container-grid__dragons-items`}>
          <h3 className={`${namespace}__oracle-heading`}>Mainchain Gateway Dragons</h3>
          <Grid container justify="center" spacing={2}>
            {this.state.mainchainGatewayDragons ? this.state.mainchainGatewayDragons.map(value => (
              <Grid key={value} item>
                <Dragon
                  location="main"
                  id={value["uid"]}
                  location="oracle"
                />
              </Grid>
            )) : null }
          </Grid>
        </Grid>
      </Grid> */}

    </Layout>
  );
}

export default Dragons;
