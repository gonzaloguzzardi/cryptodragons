import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assets/dragon.svg';
import axios from 'axios';
import Input  from '@material-ui/core/Input';
import FormLabel  from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

const oracleUrl = 'http://localhost';
const oracleApiPort = 8081;
const namespace = 'ui-view-landing';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props
        };
    }  

    createAccount = () => {
        axios.get(`${oracleUrl}:${oracleApiPort}/api/createAccount`, {
            params: { account: this.state.account, password: this.state.password },
        });
        this.state.props.history.push("/");
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

                <Button variant="contained" color="primary" onClick={this.createAccount}>
                    Register
                </Button>
            </div>
        );
    }
}

export default Register;
