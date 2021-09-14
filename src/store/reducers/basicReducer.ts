import { Reducer } from 'redux';
import { TradeInfo } from '../../interfaces/payloads';
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
      let newState = { ...state };
      const affectedCurrency = action.property.cryptocurrency === 'btc' ? 'btcBalance' : 'ethBalance';
      if (action.property.tradeType === 'buy') {
        newState = {
          ...state,
          usdcBalance: state.usdcBalance - action.property.amount,
          [affectedCurrency]: state[affectedCurrency] + action.property.receivedValue,
        };
      }
      if (action.property.tradeType === 'sell') {
        newState = {
          ...state,
          usdcBalance: state.usdcBalance + action.property.receivedValue,
          [affectedCurrency]: state[affectedCurrency] - action.property.amount,
        };
      }
      return { ...newState, openOrders: action.property.register ? [...state.openOrders, action.property] : state.openOrders };
    }
    case BasicActionTypes.TRADE_LIMIT: {
      return { ...state, openOrders: [...state.openOrders, action.property] };
    }
    default:
      return state;
  }
};
