import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import OrderInfo from './OrderInfo'
import About from './About'
import Basket from './Basket'
import Order from './Order'
import GiftInfo from './GiftInfo'

const Content = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/how_to_order" component={OrderInfo} />
      <Route path="/basket" component={Basket} />
      <Route path="/order" component={Order}/>
      <Route path="/gift/:id" component={GiftInfo}/>
    </Switch>
  )
}

export default Content