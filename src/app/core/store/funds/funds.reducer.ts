import { createReducer, on } from '@ngrx/store';
import { Fund } from '../../models/fund.model';
import {
  loadFunds,
  loadFundsSuccess,
  subscribeFund,
  cancelFund,
} from './funds.actions';

/** Funds state interface */
export interface FundsState {
  funds: Fund[];
  loading: boolean;
  error: string | null;
}

/** Initial funds state */
export const initialFundsState: FundsState = {
  funds: [],
  loading: false,
  error: null,
};

export const fundsReducer = createReducer(
  initialFundsState,
  on(loadFunds, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadFundsSuccess, (state, { funds }) => ({
    ...state,
    funds,
    loading: false,
  })),
  on(subscribeFund, (state, { fundId }) => ({
    ...state,
    funds: state.funds.map((fund) =>
      fund.id === fundId ? { ...fund, isSubscribed: true } : fund
    ),
  })),
  on(cancelFund, (state, { fundId }) => ({
    ...state,
    funds: state.funds.map((fund) =>
      fund.id === fundId ? { ...fund, isSubscribed: false } : fund
    ),
  }))
);
