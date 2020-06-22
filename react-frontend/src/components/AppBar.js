import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const DivComponent = {
  height: '125px',
  backgroundColor: '#F4C1A2',
  verticalAlign: 'center'
}


export default function ProminentAppBar() {

  return (
    <div style={DivComponent}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ fontFamily: 'cursive' }}>Love In Cube</Typography>
      </div>
      <div>
        <img src="./img/logo.png" height="100px"></img>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <Link to="/">
          <Button>Подарки</Button>
        </Link>
        <Link to="/about">
          <Button>О нас</Button>
        </Link>
        <Button>
          <Link to="/how_to_order">Как заказать</Link>
        </Button>
        <Button>
          <Link to="/basket">Корзина</Link>
        </Button>
      </div>
    </div>
  );
}