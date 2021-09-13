import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import {
  Button,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { tradeAction } from '../store/actions/basicAccion';
import { IBasicSelectorState } from '../store/reducers/basicReducer';
import { CURRENCYS_PRICES } from '../api/mocks';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(1),
  },
  input: {
    marginTop: theme.spacing(4),
  },
}));

const Trade = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const balances = useSelector((state: IBasicSelectorState) => state);
  const [tradeType, setTradeType] = useState('');
  const [cryptocurrency, setCryptocurrency] = useState('btc');
  const [orderType, setOrderType] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [receivedValue, setReceivedValue] = useState(0);

  useEffect(() => {
    const computedCurrency = cryptocurrency === 'btc' ? CURRENCYS_PRICES.bth : CURRENCYS_PRICES.eth;
    const computedPrice = price ? parseFloat(price) : computedCurrency;
    if (tradeType === 'buy') setReceivedValue(parseFloat(amount) / computedPrice);
    if (tradeType === 'sell') setReceivedValue(parseFloat(amount) * computedPrice);
    return () => {
      // cleanup
    };
  }, [amount, price, tradeType, orderType, cryptocurrency]);

  const makeOrder = () => {
    const computedSellBalance = cryptocurrency === 'btc' ? balances.basicState.btcBalance : balances.basicState.ethBalance;
    if (tradeType === 'buy' && parseFloat(amount) > balances.basicState.usdcBalance) return alert('You dont have enought usdc for this operation');
    if (tradeType === 'sell' && parseFloat(amount) > computedSellBalance) return alert(`You dont have enought ${cryptocurrency} for this operation`);
    dispatch(tradeAction({
      receivedValue, amount, cryptocurrency, tradeType,
    }));
    return true;
  };

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Create an order
      </Typography>
      <Typography variant="h6" className={classes.title}>
        usdc balance:
        {' '}
        {balances.basicState.usdcBalance}
      </Typography>
      <Typography variant="h6" className={classes.title}>
        btc balance:
        {' '}
        {balances.basicState.btcBalance}
      </Typography>
      <Typography variant="h6" className={classes.title}>
        eth balance:
        {' '}
        {balances.basicState.ethBalance}
      </Typography>
      <FormControl className={classes.formControl}>
        <TextField
          id="outlined-select-currency-native"
          select
          label="trade type"
          value={tradeType}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTradeType(event.target.value);
            if (event.target.value === 'market') setPrice('');
          }}
          helperText="Please select one"
          variant="outlined"
          className={classes.input}
        >
          <option key="buy" value="buy">
            Buy
          </option>
          <option key="sell" value="sell">
            Sell
          </option>
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Cryptocurrency"
          value={cryptocurrency}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCryptocurrency(event.target.value);
          }}
          helperText="Please select one"
          variant="outlined"
          className={classes.input}
        >
          <option key="btc" value="btc">
            Btc
          </option>
          <option key="eth" value="eth">
            Eth
          </option>
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Order Type"
          value={orderType}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setOrderType(event.target.value);
          }}
          variant="outlined"
          className={classes.input}
        >
          <option key="limit" value="limit">
            Limit
          </option>
          <option key="market" value="market">
            Market
          </option>
        </TextField>
        {
          orderType === 'limit' && (
          <TextField
            id="filled-basic"
            value={price}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPrice(event.target.value);
            }}
            variant="filled"
            className={classes.input}
            label="Order price"
          />
          )
        }
        <TextField
          id="filled-basic"
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(event.target.value);
          }}
          variant="filled"
          className={classes.input}
          label="Order amount"
        />
      </FormControl>
      <Typography>
        You will receive
        {' '}
        {receivedValue}
        {' '}
        {tradeType === 'buy' ? cryptocurrency : 'usdc'}
      </Typography>
      <Button variant="contained" color="primary" disabled={!tradeType || !cryptocurrency || !orderType || (!price && orderType !== 'market') || !amount} onClick={makeOrder}>
        Confirm
      </Button>
    </Container>
  );
};

export default Trade;
