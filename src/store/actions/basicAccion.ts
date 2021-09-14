/* eslint-disable no-unused-vars */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TradeInfo } from '../../interfaces/payloads';
import { IBasicState } from '../reducers/basicReducer';

export enum BasicActionTypes {
    TRADE = 'trade',
    TRADE_LIMIT = 'trade-limit',
}

export interface IBasicTradeAction {
    type: BasicActionTypes.TRADE;
    property: TradeInfo;
}

export interface IBasicTradeLimitAction {
  type: BasicActionTypes.TRADE_LIMIT;
  property: TradeInfo;
}

export type BasicActions = IBasicTradeAction | IBasicTradeLimitAction;

/* <Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const tradeAction: ActionCreator<ThunkAction<Promise<any>, IBasicState, null, IBasicTradeAction>> = (tradeInfo: TradeInfo) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      property: tradeInfo,
      type: BasicActionTypes.TRADE,
    });
  } catch (err) {
    console.error(err);
  }
};

export const tradeLimitAction: ActionCreator<ThunkAction<Promise<any>, IBasicState, null, IBasicTradeLimitAction>> = (tradeInfo: TradeInfo) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      property: tradeInfo,
      type: BasicActionTypes.TRADE_LIMIT,
    });
  } catch (err) {
    console.error(err);
  }
};
