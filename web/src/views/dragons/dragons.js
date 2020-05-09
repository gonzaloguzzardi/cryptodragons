import React, { Component } from 'react';
import axios from 'axios';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input  from '@material-ui/core/Input';
import FormLabel  from '@material-ui/core/FormLabel';
import Popup from "reactjs-popup";

import sleep from '../../utils/sleep';

import './dragons.scss';

const sidechainApiUrl = 'http://localhost';
const sidechainApiPort = 8001;

const mainchainUrl = 'http://localhost';
const mainchainApiPort = 8002;

const oracleUrl = 'http://localhost';
const oracleApiPort = 8081;

const namespace = 'ui-view-dragons';

class Dragons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            defSideAccount: undefined,
            defMainAccount: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
            sideAccount: undefined,
            mainAccount: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
            sideDragons: [],
            sidechainGatewayDragons: [],
            mainchainGatewayDragons: [],
            dragonsInSidechainGateway: 0,
            dragonsInMainchainGateway: 0,
            mainDragons: [],
        };

        this.getDragonsFromSide();
        this.getDragonsFromOracle();
        this.getDragonsFromMain();
    }  

    getDragonsFromMain = () => {
        axios.get(`${mainchainUrl}:${mainchainApiPort}/api/dragons`, {
            params: { account: this.state.mainAccount },
        })
            .then(res => this.setState({ mainDragons: res.data }));
    }

    getDragonsFromSide = () => {
        axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragons`, {
            params: { account: this.state.sideAccount },
        })
            .then(res => this.setState({ sideDragons: res.data }));
    }

    getDragonsFromOracle = () => {
        axios.get(`${oracleUrl}:${oracleApiPort}/api/dragons`)
            .then(res => {
                if (!res || !res.data) return;

                if (
                    res.data[0]['sidechain-gateway-results'].length < this.state.dragonsInSidechainGateway ||
                    res.data[1]['mainchain-gateway-results'].length < this.state.dragonsInMainchainGateway
                ) {
                    this.getDragonsFromMain();
                    this.getDragonsFromSide();
                }

                this.setState({
                    dragonsInSidechainGateway: res.data[0]['sidechain-gateway-results'].length,
                    dragonsInMainchainGateway: res.data[1]['mainchain-gateway-results'].length,

                    sidechainGatewayDragons: res.data[0]['sidechain-gateway-results'],
                    mainchainGatewayDragons: res.data[1]['mainchain-gateway-results'],
                });

                if (
                    res.data[0]['sidechain-gateway-results'].length > 0 ||
                    res.data[1]['mainchain-gateway-results'].length > 0
                ) {
                    sleep(1000).then(() => {
                        this.getDragonsFromOracle();
                    });
                } else {
                    sleep(500).then(() => {
                        this.getDragonsFromMain();
                        this.getDragonsFromSide();
                    });
                }
            });
    }

    buyDragonInSideChain = () => {
        axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon/create`, {
            params: { account: this.state.sideAccount },
        })
            .then(res => this.getDragonsFromSide());
    }

    buyDragonInMainChain = () => {
        axios.get(`${mainchainUrl}:${mainchainApiPort}/api/dragon/create`, {
            params: { account: this.state.mainAccount },
        })
            .then(res => this.getDragonsFromMain());
    }

    transferFromSideToMain = dragonId => (
        axios.get(`${oracleUrl}:${oracleApiPort}/api/dragon/transfer`, {
            params: { id: dragonId, toMain: true, account: this.state.sideAccount },
        })
        .then(() => {
            this.getDragonsFromOracle();
            this.getDragonsFromSide();
        })
        .catch((err) => { throw err.response.data })
    );

    transferFromMainToSide = dragonId => (
        axios.get(`${oracleUrl}:${oracleApiPort}/api/dragon/transfer`, {
            params: { id: dragonId, toMain: false, account: this.state.mainAccount },
        })
        .then(() => {
            this.getDragonsFromOracle();
            this.getDragonsFromMain();
        })
        .catch((err) => { throw err.response.data })
    );

    login = () => {
        if (this.state.account === "admin" && this.state.password === "admin") {
            this.setState({ 
                mainAccount: this.state.defMainAccount,
                sideAccount: this.state.defSideAccount
            })
        } else {
            axios.get(`${oracleUrl}:${oracleApiPort}/api/login`, {
                params: { account: this.state.account, password: this.state.password },
            }).then(res => this.setState({ 
                mainAccount: res.data.mainAccount,
                sideAccount: res.data.sideAccount
            }));
        }
        this.getDragonsFromSide();
        this.getDragonsFromOracle();
        this.getDragonsFromMain();
    }

    onChangeAccount = event => {
        this.setState({ account: event.target.value });
    }
  
    onChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    openLoginPopUp = () => {
        return (
            <div>
                <Grid container justify="center" spacing={2}>
                <Grid item>
                    <FormLabel>
                        <b>Account</b>&nbsp;
                        <Input
                            type="text"
                            name="account"
                            className={`${namespace}__container-div__map-acounts__input`}
                            onChange={this.onChangeAccount}
                        />
                    </FormLabel>
                </Grid>
                </Grid>
                <Grid container justify="center" spacing={2}>
                <Grid item>
                    <FormLabel>
                        <b>Password</b>&nbsp;
                        <Input
                            type="text"
                            name="password"
                            className={`${namespace}__container-div__map-acounts__input`}
                            onChange={this.onChangePassword}
                        />
                    </FormLabel>
                </Grid>
                </Grid>
                <Grid container justify="center" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.login}>
                        Submit
                    </Button>
                </Grid>
                </Grid>
            </div>
        );
    } 

    render() {
        return (
            <div className={`${namespace}__container-div`}>

                { /* Map accounts */ }
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <Popup trigger={<Button variant="contained" color="primary" onClick={this.openLogin}>Login</Button>} modal position="top left">
                            {this.openLoginPopUp}
                        </Popup>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" href="/">Home</Button>
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

                {this.state.showLogin && this.openLoginPopUp()}
            </div>
 
        );
    }
}

export default Dragons;