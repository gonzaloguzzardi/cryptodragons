import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MainchainAPI from '../../services/blockchain-interaction/mainchain';
import SidechainAPI from '../../services/blockchain-interaction/sidechain';

import dragonStyles from './dragon.module.scss';

const GAS_DEFAULT_VALUE = 350000;

interface IProps {
  location: string,
  id: string,
  transferMethod: (id: string) => Promise<any>,
}

interface IState {
  location: string,
  name: string,
  id: string,
  pic: string,
  fetching: boolean,
  health: string,
  agility: string,
  strength: string,
  fortitude: string,
}

class Dragon extends Component<IProps, IState> {

  constructor(props) {
    super(props);

    this.state = {
      location: props.location,
      name: "dragon",
      id: props.id,
      pic: "onepic",
      fetching: false,
      health: '',
      agility: '',
      strength: '',
      fortitude: '',
    };

    this.getDragonData();
  }

  getDragonData = () => {
    if (this.state.location === "side") {
      SidechainAPI.getDragonDataById(this.state.id, GAS_DEFAULT_VALUE).then(dragonData => this.setState(dragonData));
    }
    if (this.state.location === "main") {
      MainchainAPI.getDragonDataById(this.state.id, GAS_DEFAULT_VALUE).then(dragonData => this.setState(dragonData));
    }
  }

  transfer = () => {
    this.setState({ fetching: true });
    this.props.transferMethod(this.state.id)
      .catch(e => this.setState({ fetching: false }));
  };

  render() {
    return (
      <Card className={dragonStyles.container}>
        <CardContent>
          <Typography color="textSecondary" align="center" gutterBottom>
            #{this.state.id} {this.state.name}
          </Typography>
          <CardMedia>
            <img src={'/assets/dragonsito.jpg'} alt="" width="100" height="100"/>
          </CardMedia>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <img src={'/assets/corazon.svg'} alt="" width="20" height="20"/>
              <p>{this.state.health}</p>
            </Grid>
            <Grid item>
              <img src={'/assets/reloj.svg'} alt="" width="20" height="20"/>
              <p>{this.state.agility}</p>
            </Grid>
            <Grid item>
              <img src={'/assets/espada.svg'} alt="" width="20" height="20"/>
              <p>{this.state.strength}</p>
            </Grid>
            <Grid item>
              <img src={'/assets/escudo.svg'} alt="" width="20" height="20"/>
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
