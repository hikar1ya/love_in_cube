import React from 'react';
import Container from '@material-ui/core/Container'
import './List.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'

export default class GiftInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gift: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/get-gift', { method: "POST", body: this.props.match.params.id })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loading: false,
                    gift: json,
                });
            });
    }

    render() {
        return (
            <Container>
                {this.state.gift.map((_gift) => (
                    <Card style={{ display: 'flex' }}>
                        <CardMedia
                            style={{ width: '600px', height: '600px' }}
                            image={_gift.image}
                            title="Подарок"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', width: '500px', flex: '1' }}>
                            <CardContent style={{ flex: '1 0 auto' }}>
                                <Typography component="h5" variant="h5">
                                    {_gift.name}
                                </Typography>
                                <Typography style={{ marginTop: '30px' }}>
                                    {_gift.about}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '30px' }}>
                                    В этот набор входит: {_gift.staff.map((elem) => (<div style={{ marginLeft: '30px' }}>- {elem}</div>))}
                                </Typography>
                                <Typography component="h5" variant="h5" style={{ marginTop: '30px' }}>
                                    Цена: {_gift.price} руб.
                            </Typography>
                            </CardContent>
                            <CardActions style={{marginLeft: 'auto'}}>
                                <Button onClick={() => {
                                    fetch('http://localhost:5000/add', { method: "POST", body: _gift._id })
                                }}>
                                    Добавить в корзину
                                </Button>
                            </CardActions>
                        </div>
                        
                    </Card>
                ))}
            </Container>

        );
    }
}