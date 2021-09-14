import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IBasicSelectorState } from '../store/reducers/basicReducer';
import OrderCard from './OrderCard';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const OrderBook = () => {
  const classes = useStyles();
  const orders = useSelector((state: IBasicSelectorState) => state.basicState.openOrders);

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Your order book:
      </Typography>
      {
        // shallow copy of orders and then reverse the copy.
        orders.slice(0).reverse().map((order) => (
          <>
            <Divider />
            <OrderCard order={order} />
          </>
        ))
      }
    </Container>
  );
};

export default OrderBook;
