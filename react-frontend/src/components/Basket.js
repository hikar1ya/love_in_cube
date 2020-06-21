import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import './List.css'


export default class Basket extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
        };
    }

    componentDidMount() {
        var list_id = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
        fetch('http://localhost:5000/cart', { method: "POST", body: list_id })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loading: false,
                    list: json,
                });
            });
    }

    render() {
        return (<>
            <Button color="black">
                <Link to="/order">Оформить</Link>
            </Button>
            <Grid container spacing={10}>
                {this.state.list.map((gift) => (
                    <Grid key={gift._id} item xs={12} sm={12} md={12} lg={12} spacing={10}>
                        <Card>
                            <CardActionArea>
                                <CardMedia style={{ height: '250px' }} component="img" image={gift.image} title="Gift Card" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" className="giftName">
                                        {gift.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                                        <div>{gift.price} руб.</div>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
        );
    }
}

