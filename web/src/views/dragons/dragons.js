import React, { Component } from 'react';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input  from '@material-ui/core/Input';
import FormLabel  from '@material-ui/core/FormLabel';
import { _getDragonsFromMain, _getDragonsFromSide, _getDragonsFromOracle, 
    _buyDragonInMainChain, _buyDragonInSideChain, _transferDragon, 
    _mapAccounts, _isMap } from '../../services/dragons'
import sleep from '../../utils/sleep';

import './dragons.scss';

const namespace = 'ui-view-dragons';

class Dragons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            defSideAccount: '0xfee39fad945754831b59b92a1a8339f65358792d',
            defMainAccount: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
            sideAccount: '0xfee39fad945754831b59b92a1a8339f65358792d',
            mainAccount: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
            sideDragons: [],
            sidechainGatewayDragons: [],
            mainchainGatewayDragons: [],
            dragonsInSidechainGateway: 0,
            dragonsInMainchainGateway: 0,
            mainDragons: [],
            isMap: false
        };

        this.getDragonsFromSide();
        this.getDragonsFromOracle();
        this.getDragonsFromMain();
        this.isMap();
    }  

    getDragonsFromMain = () => {
        _getDragonsFromMain().then(mainDragons => this.setState({mainDragons: mainDragons}));
    }

    getDragonsFromSide = () => {
        _getDragonsFromSide().then(sideDragons => this.setState({sideDragons: sideDragons}));
    }

    getDragonsFromOracle = () => {
        _getDragonsFromOracle().then(res => {
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
        _buyDragonInSideChain().then(this.getDragonsFromSide());
    }

    buyDragonInMainChain = () => {
        _buyDragonInMainChain().then(this.getDragonsFromMain());
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

    isMap = () => {
        _isMap(this.state.mainAccount, this.state.sideAccount, this.state.sideAccount).then(res => 
            {
                this.setState({ 
                    isMap: res.data
                });
            }
        );
    } 

    onChangeMainAccount = event => {
        this.setState({ mainAccount: event.target.value });
    }

    onChangeSideAccount = event => {
        this.setState({ sideAccount: event.target.value });
    }

    showMapButton = () => {
        if (this.state.isMap) {
            return (
                <Button variant="contained" color="primary" className="botonVerde" onClick={this.mapAccounts}>
                    Map Accounts
                </Button>
            );
        } else {
            return (
                <Button variant="contained" color="primary" onClick={this.mapAccounts}>
                    Map Accounts
                </Button>
            );
        }
    } 

    render() {
        return (
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
                                defaultValue={this.state.defSideAccount}
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
                                defaultValue={this.state.defMainAccount}
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
}

export default Dragons;