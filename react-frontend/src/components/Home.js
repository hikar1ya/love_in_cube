import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import './List.css'



export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/catalog')
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loading: false,
                    list: json,
                });
            });
    }

    render() {
        return (
            <>
                <Box component="span" m={1}>
                    <Button />
                </Box>
                <Box>
                    <Grid container spacing={10}>
                        {this.state.list.map((gift) => (
                            <Grid item xs={12} sm={6} md={4} lg={4} spacing={10}>
                                <Card key={gift._id}>
                                    <CardActionArea>
                                        <CardMedia image=""
                                            style={{ height: '250px' }} title="Gift Card" />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" className="giftName">
                                                {gift.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" align="center">
                                                <div>{gift.price} руб.</div>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions >
                                        <Button size="small" color="primary" className="button">
                                            Что внутри?
                                </Button>
                                        <Button onClick={() => {
                                            console.log('click')
                                            fetch('http://localhost:5000/add', { method: "POST", body: gift._id })
                                        }} size="small" color="primary" className="button">
                                            Добавить в корзину
                                </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </>
        );
    }
}

