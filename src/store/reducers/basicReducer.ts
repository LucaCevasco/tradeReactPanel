import { Reducer } from 'redux';
import { CURRENCYS_PRICES } from '../../api/mocks';
import { TradeInfo } from '../../interfaces/payloads';
import { BasicActionTypes, BasicActions } from '../actions/basicAccion';

export interface IBasicState {
  usdcBalance: number;
  btcBalance: number;
  ethBalance: number;
  openOrders: TradeInfo[];
  acumulatedFee: number
}

export interface IBasicSelectorState {
  basicState: {
    usdcBalance: number;
    btcBalance: number;
    ethBalance: number;
    openOrders: TradeInfo[];
    acumulatedFee: number
  }
}

const initialBasicState: IBasicState = {
  usdcBalance: 85000,
  btcBalance: 0,
  ethBalance: 0.3,
  openOrders: [],
  acumulatedFee: 0,
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
        // IMPROVE: abstracting fee calculation to a function in utils
        const fee = (state[affectedCurrency] + action.property.receivedValue) * 0.015;
        const computedCurrencyValue = action.property.cryptocurrency === 'btc' ? CURRENCYS_PRICES.bth : CURRENCYS_PRICES.eth;
        newState = {
          ...state,
          usdcBalance: state.usdcBalance - action.property.amount,
          // change fee currency to USDC before adding to de acumulator
          acumulatedFee: state.acumulatedFee + (fee * computedCurrencyValue),
          [affectedCurrency]: state[affectedCurrency] + action.property.receivedValue - fee,
        };
      }
      if (action.property.tradeType === 'sell') {
        const fee = (state.usdcBalance + action.property.receivedValue) * 0.015;
        newState = {
          ...state,
          usdcBalance: state.usdcBalance + action.property.receivedValue - fee,
          acumulatedFee: state.acumulatedFee + fee,
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
