import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import './List.css'

export default function ProminentAppBar() {

  return (
    <div style={{ height: '125px', backgroundColor: '#fff5d1', verticalAlign: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ fontFamily: 'cursive' }}>Love In Cube</Typography>
      </div>
      <div style={{ marginLeft: '135px' }}>
        <Button color="black">
          <Link to="/">Подарки</Link>
        </Button>
        <Link to="/about">
          <Button color="black">О нас</Button>
        </Link>
        <Button color="black">
          <Link to="/how_to_order">Как заказать</Link>
        </Button>
        <Button color="black">
          <Link to="/basket">Корзина</Link>
        </Button>
      </div>
    </div>
  );
}