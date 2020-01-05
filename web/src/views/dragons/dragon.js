import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

class Dragon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "dragon",
            id: props.id,
            pic: "onepic",
        };
    }  

    getDragons = () => this.props.parentMethod();

    transfer = () => (
        this.props.transferMethod(this.state.id, this.getDragons)
    );

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
                    { this.props.transferMethod &&
                        <Button variant="contained" color="primary" onClick={this.transfer}>
                            Transfer
                        </Button>
                    }
                </CardActions>
            </Card>
        );
    }
}

export default Dragon;