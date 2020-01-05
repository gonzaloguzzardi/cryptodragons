import React, { Component } from 'react';
import axios from 'axios';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './dragons.scss';

const sidechainApiPort = 8001;
const mainchainApiPort = 8002;
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

        axios.get(`http://localhost:${sidechainApiPort}/api/dragons`)
        .then(res => {
            this.setState({ sideDragons: res.data });
            console.log(this.state);
        });

        axios.get(`http://localhost:${sidechainApiPort}/api/dragons`)
        .then(res => {
            this.setState({ oracleDragons: res.data });
            console.log(this.state);
        });

        axios.get(`http://localhost:${mainchainApiPort}/api/dragons`)
        .then(res => {
            this.setState({ mainDragons: res.data });
            console.log(this.state);
        });
    }  

    getDragonsFromMain = () => {
        axios.get(`http://localhost:${mainchainApiPort}/api/dragons`)
        .then(res => this.setState({ mainDragons: res.data }));
    }

    getDragonsFromSide = () => {
        axios.get(`http://localhost:${sidechainApiPort}/api/dragons`)
        .then(res => this.setState({ sideDragons: res.data }));
    }

    getDragonsFromOracle = () => {
        axios.get(`http://localhost:${oracleApiPort}/api/dragons`)
        .then(res => this.setState({ oracleDragons: res.data }));
    }

    buyDragonInSideChain = () => {
        axios.get(`http://localhost:${sidechainApiPort}/api/dragon/create`)
        .then(res => this.getDragonsFromSide());
    }

    buyDragonInMainChain = () => {
        axios.get(`http://localhost:${mainchainApiPort}/api/dragon/create`)
        .then(res => this.getDragonsFromMain());
    }

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
                                        <Dragon id={value} parentMethod={this.getDragonsFromSide}/>
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
                                        <Dragon id={value} parentMethod={this.getDragonsFromMain}/>
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
                                <Dragon id={value} parentMethod={this.getDragonsFromOracle}/>
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