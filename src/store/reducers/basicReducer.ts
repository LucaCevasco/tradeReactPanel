import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicAccion';

export interface IBasicState {
  usdcBalance: number;
  btcBalance: number;
  ethBalance: number;
}

export interface IBasicSelectorState {
  basicState: {
    usdcBalance: number;
    btcBalance: number;
    ethBalance: number;
  }
}

const initialBasicState: IBasicState = {
  usdcBalance: 85000,
  btcBalance: 0,
  ethBalance: 0.3,
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
    default:
      return state;
  }
};
