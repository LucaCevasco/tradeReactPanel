import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const OrderBook = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Your order book:
      </Typography>
    </Container>
  );
};

export default OrderBook;
