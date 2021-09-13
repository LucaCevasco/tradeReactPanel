import { TradeInfo } from './interfaces/payloads';

export const isTradeEqual = (trade1: TradeInfo, trade2: TradeInfo) => {
  if (
    trade1.amount === trade2.amount
      && trade1.cryptocurrency === trade2.cryptocurrency
      && trade1.receivedValue === trade2.receivedValue
      && trade1.tradeType === trade2.tradeType
  ) {
    return true;
  }
  return false;
};
