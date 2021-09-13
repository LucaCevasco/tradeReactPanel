import { Reducer } from 'redux';
import { TradeInfo } from '../../interfaces/payloads';
import { isTradeEqual } from '../../utils';
import { BasicActionTypes, BasicActions } from '../actions/basicAccion';

export interface IBasicState {
  usdcBalance: number;
  btcBalance: number;
  ethBalance: number;
  openOrders: TradeInfo[]

}

export interface IBasicSelectorState {
  basicState: {
    usdcBalance: number;
    btcBalance: number;
    ethBalance: number;
    openOrders: TradeInfo[]
  }
}

const initialBasicState: IBasicState = {
  usdcBalance: 85000,
  btcBalance: 0,
  ethBalance: 0.3,
  openOrders: [],
};

export const basicReducer: Reducer<IBasicState, BasicActions> = (
  state = initialBasicState,
  action,
) => {
  switch (action.type) {
    case BasicActionTypes.TRADE: {
      let newBalance = { ...state };
      const affectedCurrency = action.property.cryptocurrency === 'btc' ? 'btcBalance' : 'ethBalance';
      if (action.property.tradeType === 'buy') {
        newBalance = {
          ...state,
          usdcBalance: state.usdcBalance - action.property.amount,
          [affectedCurrency]: state[affectedCurrency] + action.property.receivedValue,
        };
      }
      if (action.property.tradeType === 'sell') {
        newBalance = {
          ...state,
          usdcBalance: state.usdcBalance + action.property.receivedValue,
          [affectedCurrency]: state[affectedCurrency] - action.property.amount,
        };
      }
      return newBalance;
    }
    case BasicActionTypes.TRADE_LIMIT: {
      return { ...state, openOrders: [...state.openOrders, action.property] };
    }
    case BasicActionTypes.EXECUTE_LIMIT: {
      const newOpenOrders = state.openOrders.filter((order) => !isTradeEqual(order, action.property));
      return { ...state, openOrders: newOpenOrders };
    }
    default:
      return state;
  }
};
