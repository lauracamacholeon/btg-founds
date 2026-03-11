import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FundsState } from './funds.reducer';

/** Feature selector for the funds state */
export const selectFundsState = createFeatureSelector<FundsState>('funds');

/** Selector to get all funds */
export const selectAllFunds = createSelector(
  selectFundsState,
  (state) => state.funds
);

/** Selector to get subscribed funds */
export const selectSubscribedFunds = createSelector(selectAllFunds, (funds) =>
  funds.filter((fund) => fund.isSubscribed)
);

/** Selector to get available funds (not subscribed) */
export const selectAvailableFunds = createSelector(selectAllFunds, (funds) =>
  funds.filter((fund) => !fund.isSubscribed)
);

/** Selector to get loading state */
export const selectFundsLoading = createSelector(
  selectFundsState,
  (state) => state.loading
);
