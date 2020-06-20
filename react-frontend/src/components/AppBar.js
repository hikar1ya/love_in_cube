import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

export default function ProminentAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            Love In Cube
          </Typography>
          <Button color="black">
            <Link to="/">Подарки</Link>
          </Button>
          <Button color="black">
            <Link to="/about">О нас</Link>
          </Button>
          <Button color="black">
            <Link to="/how_to_order">Как заказать</Link>
          </Button>
          <Button color="black">
            <Link to="/basket">Корзина</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}