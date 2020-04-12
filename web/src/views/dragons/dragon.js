import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const oracleApiUrl = 'http://localhost';
const oracleApiPort = 8081;
const axios = require('axios');

class Dragon extends Component {

    constructor(props) {
        super(props);
        this.getDragon = this.getDragon.bind(this);
        this.state = {
            location: props.location,
            name: "dragon",
            id: props.id,
            pic: "onepic",
            fetching: false,
        };
        this.getDragon();
    }  

    getDragon = () => {
        axios.get(`${oracleApiUrl}:${oracleApiPort}/api/dragon?id=` + this.state.id + `&location=` + this.state.location )
            .then(res => { 
                    this.setState(
                        { 
                            data: res.data,
                            health: res.data.health,
                            agility: res.data.agility,
                            strength: res.data.strength,
                            fortitude: res.data.fortitude,
                            name: res.data.name,
                            dadId: res.data.dadId,
                            motherId: res.data.motherId,
                            currentExperience: res.data.currentExperience,
                            sname:  res.data.sname
                        });
                    console.log(res.data);
                });
    }

    transfer = () => {
        this.setState({ fetching: true });
        this.props.transferMethod(this.state.id)
            .catch(e => this.setState({ fetching: false }));
    };

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography color="textSecondary" align="center" gutterBottom>
                        #{this.state.id} {this.state.sname}
                    </Typography>
                    <CardMedia>
                        <img src={require('../../assets/dragonsito.jpg')} alt="" width="100" height="100"/>
                    </CardMedia>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <img src={require('../../assets/corazon.svg')} alt="" width="20" height="20"/>
                            <p>{this.state.health}</p>
                        </Grid>
                        <Grid item>
                            <img src={require('../../assets/reloj.svg')} alt="" width="20" height="20"/>
                            <p>{this.state.agility}</p>
                        </Grid>
                        <Grid item>
                            <img src={require('../../assets/espada.svg')} alt="" width="20" height="20"/>
                            <p>{this.state.strength}</p>
                        </Grid>
                        <Grid item>
                            <img src={require('../../assets/escudo.svg')} alt="" width="20" height="20"/>
                            <p>{this.state.fortitude}</p>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                    { this.props.transferMethod && !this.state.fetching &&
                        <Button variant="contained" color="primary" onClick={this.transfer}>
                            Transfer
                        </Button>
                    }
                    { this.props.transferMethod && this.state.fetching &&
                        <CircularProgress />
                    }
                </CardActions>
            </Card>
        );
    }
}

export default Dragon;