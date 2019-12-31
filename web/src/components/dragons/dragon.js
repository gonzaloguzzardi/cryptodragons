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
            name:"dragon",
            id:props.id,
            pic:"onepic"
        };
    }  
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography color="textSecondary" align="center" gutterBottom>
                        {this.state.id}
                    </Typography>
                    <CardMedia>
                        <img src={require('./dragonsito.jpg')} alt="" width="200" height="200"/>
                    </CardMedia>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>  
                    <div>
                        <Button variant="contained" color="primary" href="dragons" align="center">
                            Transfer
                        </Button>

                    </div>  
                </CardActions>
            </Card>
        );
    }
}

export default Dragon;