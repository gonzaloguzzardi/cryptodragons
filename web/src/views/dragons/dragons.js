import React, { Component } from 'react';
import axios from 'axios';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input  from '@material-ui/core/Input';
import FormLabel  from '@material-ui/core/FormLabel';

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
            defSideAccount:'0xfee39fad945754831b59b92a1a8339f65358792d',
            defMainAccount:'0x28863498efede12296888f7ca6cf0b94974fbdbc',
            sideAccount:'0xfee39fad945754831b59b92a1a8339f65358792d',
            mainAccount:'0x28863498efede12296888f7ca6cf0b94974fbdbc',
            sideDragons:[],
            oracleDragons:[],
            mainDragons: [],
        };

        this.getDragonsFromSide();
        this.getDragonsFromOracle();
        this.getDragonsFromMain();
    }  

    getDragonsFromMain = () => {
        axios.get(`${mainchainUrl}:${mainchainApiPort}/api/dragons`)
            .then(res => this.setState({ mainDragons: res.data }));
    }

    getDragonsFromSide = () => {
        axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragons`)
            .then(res => this.setState({ sideDragons: res.data }));
    }

    getDragonsFromOracle = () => {
        axios.get(`${oracleUrl}:${oracleApiPort}/api/dragons`)
            .then(res => {
                this.setState({ oracleDragons: res.data });
                if (res.data && res.data.length > 0) {
                    sleep(500).then(() => {
                        this.getDragonsFromOracle();
                        this.getDragonsFromMain();
                        this.getDragonsFromSide();
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
        axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon/create`)
            .then(res => this.getDragonsFromSide());
    }

    buyDragonInMainChain = () => {
        axios.get(`${mainchainUrl}:${mainchainApiPort}/api/dragon/create`)
            .then(res => this.getDragonsFromMain());
    }

    transferFromSideToMain = dragonId => (
        axios.get(`${oracleUrl}:${oracleApiPort}/api/dragon/transfer`, {
            params: { id: dragonId, toMain: true },
        })
        .then(() => this.getDragonsFromOracle())
    );

    transferFromMainToSide = dragonId => (
        axios.get(`${oracleUrl}:${oracleApiPort}/api/dragon/transfer`, {
            params: { id: dragonId, toMain: false },
        })
        .then(() => this.getDragonsFromOracle())
    );

    mapAccounts = () => {
        axios.get(`${oracleUrl}:${oracleApiPort}/api/mapAccounts`, {
            params: { mainAccount: this.state.mainAccount, sideAccount: this.state.sideAccount },
        });
    }

    onChangeMainAccount = event => {
        this.setState({ mainAccount: event.target.value });
    }

    onChangeSideAccount = event => {
        this.setState({ sideAccount: event.target.value });
    }

    render() {
        return (
            <div className={`${namespace}__container-div`}>

                { /* Map accounts */ }
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <FormLabel>
                            SideChain Account:
                            <Input type="text" name="sideAccount" defaultValue={this.state.defSideAccount} onChange={this.onChangeSideAccount} />
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.mapAccounts}>
                            Map Accounts
                        </Button>
                    </Grid>
                    <Grid item>
                        <FormLabel>
                            MainChain Account:
                            <Input type="text" name="mainAccount" defaultValue={this.state.defMainAccount} onChange={this.onChangeMainAccount}/>
                        </FormLabel>
                    </Grid>
                </Grid>

                { /* Buttons */ }
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
                    <Grid item xs={6}>
                        <h3 className={`${namespace}__chains-headings`}>Side Chain Dragons</h3>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Grid container spacing={2}>
                                    {this.state.sideDragons.map(value => (
                                    <Grid key={value} item>
                                        <Dragon
                                            id={value}
                                            transferMethod={this.transferFromSideToMain}
                                        />
                                    </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <h3 className={`${namespace}__chains-headings`}>Main Chain Dragons</h3>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Grid container spacing={2}>
                                    {this.state.mainDragons.map(value => (
                                    <Grid key={value} item>
                                        <Dragon
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
                <h3 className={`${namespace}__oracle-heading`}>Oracle Dragons</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {this.state.oracleDragons.map(value => (
                            <Grid key={value} item>
                                <Dragon id={value["id"]} />
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Dragons;