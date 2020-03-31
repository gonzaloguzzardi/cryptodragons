import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

class Dragon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "dragon",
            id: props.id,
            pic: "onepic",
            fetching: false,
        };
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
                        {this.state.id}
                    </Typography>
                    <CardMedia>
                        <img src={require('../../assets/dragonsito.jpg')} alt="" width="100" height="100"/>
                    </CardMedia>
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