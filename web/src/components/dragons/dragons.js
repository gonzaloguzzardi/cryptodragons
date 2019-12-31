import React, { Component } from 'react';
import parse from './dragonParser.js';
import axios from 'axios';
import Dragon from './dragon.js';
import Grid from '@material-ui/core/Grid';

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
    }  

    getDragons() {
        axios.get("http://localhost:8001/api/dragons",{
            headers: {
                'Content-Type': 'text/html', 
                'Access-Control-Allow-Origin': true
            }
        })
        .then(res => {
          console.log(res.data);
        })
    }

    render() {
        const spacing = 2;
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={spacing}>
                            {this.state.dragons.map(value => (
                            <Grid key={value} item>
                                <Dragon id={value}/>
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