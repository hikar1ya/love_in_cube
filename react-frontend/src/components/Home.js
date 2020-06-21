import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import './List.css'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            basket: [],
        };
    }


    addBasket = (id) => {
        const basket = this.state.basket

        const index = basket.findIndex(x => x === id)

        if (index === -1) {
            basket.push(id)
            this.setState({
                basket
            })
            localStorage.setItem('basket', JSON.stringify(basket))
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/catalog')
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loading: false,
                    list: json,
                    basket: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
                });
            });
    }

    render() {
        return (
            <Container>
                <Grid container spacing={10} >
                    {this.state.list.map((gift) => (
                        <Grid key={gift._id} item xs={12} sm={6} md={4} lg={4}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia image={gift.image}
                                        style={{ height: '250px' }} title="Gift Card" />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" className="giftName">
                                            {gift.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                                            {gift.price} руб.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions >
                                    <Link to={"/gift/" + gift._id}>
                                        <Button size="small" color="primary" className="button">
                                            Что внутри?
                                    </Button>
                                    </Link>
                                    <Button onClick={() => this.addBasket(gift._id)} size="small" color="primary" className="button">
                                        Добавить в корзину
                                </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}

