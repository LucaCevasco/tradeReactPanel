import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TradeInfo } from '../interfaces/payloads';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const OrderCard = ({ order }: { order: TradeInfo}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Operation type:
          {' '}
          {order.tradeType}
        </Typography>
        <Typography variant="h5" component="h2">
          Receive
          {' '}
          {order.receivedValue}
          {' '}
          {order.tradeType === 'buy' ? order.cryptocurrency : 'Usdc'}
          {' '}
          (minus fee)
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Spend
          {' '}
          {order.amount}
          {' '}
          {order.tradeType === 'buy' ? 'Usdc ' : order.cryptocurrency}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
