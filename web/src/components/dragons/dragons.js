import React, { Component } from 'react';
import parse from './dragonParser.js';
import axios from 'axios';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Dragons extends Component {

    constructor(props) {
        super(props);

        this.state = {dragons:[]}

        axios.get("http://localhost:8001/api/dragons")
        .then(res => {
            this.setState({dragons: res.data});
            console.log(this.state);
        })
        this.getDragons = this.getDragons.bind(this);
        this.buyDragon = this.buyDragon.bind(this);
    }  

    getDragons() {
        axios.get("http://localhost:8001/api/dragons",{
            headers: {
                'Content-Type': 'text/html', 
                'Access-Control-Allow-Origin': true
            }
        })
        .then(res => {
            this.setState({dragons: res.data});
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
            this.getDragons();
        })
    }

    render() {
        const spacing = 2;
        return (
            <div style={{ marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={this.buyDragon}>
                    Buy New Dragon
                </Button>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={spacing}>
                            {this.state.dragons.map(value => (
                            <Grid key={value} item>
                                <Dragon id={value} parentMethod={this.getDragons}/>
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