import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderBook from './OrderBook';
import Trade from './Trade';

const NavStack = () => (
  <Switch>
    <Route path="/book">
      <OrderBook />
    </Route>
    <Route path="/">
      <Trade />
    </Route>
  </Switch>
);

export default NavStack;
