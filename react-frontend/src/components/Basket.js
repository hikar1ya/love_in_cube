import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
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

    getPrice() {
        var sum = 0
        this.state.list.map((gift) => {
            sum += gift.price
        })
        return sum
    }

    render() {
        return (
            <Container style={{ display: 'flex' }}>
                <Box style={{ width: '800px' }}>
                    {this.state.list.map((gift) => (
                        <Card key={gift._id} style={{ flex: '1', display: 'flex', marginTop: '15px' }}>
                            <CardMedia
                                style={{ width: '150px', height: '150px' }}
                                image={gift.image}
                                title="Подарок"
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                                <CardContent style={{ flex: '1 0 auto' }}>
                                    <Typography component="h5" variant="h5">
                                        {gift.name}
                                    </Typography>
                                    <Typography color="textSecondary" variant="subtitle1">
                                        Цена: {gift.price} руб.
                                    </Typography>
                                    <Button>
                                        <Link to={"/gift/"+gift._id}>Посмотреть содержимое</Link>
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </Box>
                <Box alignItems="flex-start" flex='1' marginTop="15px" marginLeft="30px" borderWidth="15px" borderColor="black">
                    <div style={{ flex: '1', height: '100px' }}>
                        <Typography component="h5" variant="h5">
                            Итого: {this.getPrice()} руб.
                        </Typography>
                        <Button>
                            <Link to="/order">Перейти к оформлению заказа</Link>
                        </Button>
                    </div>
                </Box>
            </Container>
        );
    }
}

