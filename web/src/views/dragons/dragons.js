import React, { Component } from 'react';
import axios from 'axios';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
        axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon/transfer`, {
            params: { id: dragonId },
        })
        .then(() => this.getDragonsFromOracle())
    );

    transferFromMainToSide = dragonId => (
        axios.get(`${mainchainUrl}:${mainchainApiPort}/api/dragon/transfer`, {
            params: { id: dragonId },
        })
        .then(() => this.getDragonsFromOracle())
    );

    render() {
        return (
            <div className={`${namespace}__container-div`}>
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