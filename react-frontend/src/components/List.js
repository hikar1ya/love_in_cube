import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './List.css'

export default class List extends React.Component {
    render() {
        return (
            <Grid container spacing={10}>
                {this.props.items.map((gift) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} spacing={10}>
                        <Card key={gift._id}>
                            <CardActionArea>
                                <CardMedia image="" style={{ height: '250px' }} title="Gift Card" />
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
                                <Button size="small" color="primary" className="button">
                                    Купить
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

