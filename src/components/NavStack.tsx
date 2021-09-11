import React from 'react';
import { Route, Switch } from 'react-router-dom';

const NavStack = () => (
  <Switch>
    <Route path="/buy">
      <p>comprar</p>
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
