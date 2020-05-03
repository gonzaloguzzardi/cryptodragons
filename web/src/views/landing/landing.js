import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assets/dragon.svg';
import axios from 'axios';

import Input  from '@material-ui/core/Input';
import FormLabel  from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

import './landing.scss';

const oracleUrl = 'http://localhost';
const oracleApiPort = 8081;
const namespace = 'ui-view-landing';

export class Landing extends Component {

  login = () => {
    axios.get(`${oracleUrl}:${oracleApiPort}/api/login`, {
        params: { account: this.state.account, password: this.state.password },
    }).then(res => this.setState(
      { 
        mainAccount: res.data.mainAccount,
        sideAccount: res.data.sideAccount
      }));
  }

  onChangeAccount = event => {
      this.setState({ account: event.target.value });
  }

  onChangePassword = event => {
      this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className={`${namespace}__div-container`}>
        <div className={`${namespace}__header`}>
          <img src={logo} className={`${namespace}__header-logo`} alt="logo" />
          <h2>Welcome to CryptoDragons</h2>
        </div>
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
              Login
            </Button>
          </Grid>
        </Grid>

        <Grid container justify="center" spacing={2}>
          <Grid item>
            <b>Not registered yet?, Register Now</b>  
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" href="register">
          Register
        </Button>
      </div>
    );
  }
}

export default Landing;
