import React, { Component } from 'react';
import axios from 'axios';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Dragons extends Component {

    constructor(props) {
        super(props);

        this.state = { sideDragons:[], oracleDragons:[] }

        axios.get("http://localhost:8001/api/dragons")
        .then(res => {
            this.setState({sideDragons: res.data});
            console.log(this.state);
        });

        axios.get("http://localhost:8081/api/dragons")
        .then(res => {
            this.setState({oracleDragons: res.data});
            console.log(this.state);
        });
        
        this.getDragonsFromSide = this.getDragonsFromSide.bind(this);
        this.getDragonsFromOracle = this.getDragonsFromOracle.bind(this);
        this.buyDragon = this.buyDragon.bind(this);
    }  

    getDragonsFromSide() {
        axios.get("http://localhost:8001/api/dragons",{
            headers: {
                'Content-Type': 'text/html', 
                'Access-Control-Allow-Origin': true
            }
        })
        .then(res => {
            this.setState({sideDragons: res.data});
            this.getDragonsFromOracle();
        })
    }

    getDragonsFromOracle() {
        axios.get("http://localhost:8081/api/dragons",{
            headers: {
                'Content-Type': 'text/html', 
                'Access-Control-Allow-Origin': true
            }
        })
        .then(res => {
            this.setState({oracleDragons: res.data});
            this.getDragonsFromSide();
        })
    }

    buyDragon() {
        axios.get("http://localhost:8001/api/dragon/create",{
            headers: {
                'Content-Type': 'text/html', 
                'Access-Control-Allow-Origin': true
            }
        })
        .then(res => {
            this.getDragonsFromSide();
        })
    }

    render() {
        const spacing = 2;
        return (
            <div style={{ marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={this.buyDragon}>
                    Buy New Dragon
                </Button>
                <h1>Side Chain Dragons</h1>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={spacing}>
                            {this.state.sideDragons.map(value => (
                            <Grid key={value} item>
                                <Dragon id={value} parentMethod={this.getDragonsFromSide}/>
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <h1>Oracle Dragons</h1>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={spacing}>
                            {this.state.oracleDragons.map(value => (
                            <Grid key={value["id"]} item>
                                <Dragon id={value["id"]} parentMethod={this.getDragonsFromSide}/>
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