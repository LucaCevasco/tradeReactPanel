import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Trade from './Trade';

const NavStack = () => (
  <Switch>
    <Route path="/trade">
      <Trade />
    </Route>
    <Route path="/sell">
      <p>vender</p>
    </Route>
    <Route path="/">
      <p>home</p>
    </Route>
  </Switch>
);

export default NavStack;
