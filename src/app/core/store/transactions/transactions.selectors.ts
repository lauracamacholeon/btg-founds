import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.reducer';

/** Feature selector for the transactions state */
export const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactions');

/** Selector to get all transactions */
export const selectAllTransactions = createSelector(
  selectTransactionsState,
  (state) => state.transactions
);

/** Selector to get only subscription transactions */
export const selectSubscriptionTransactions = createSelector(
  selectAllTransactions,
  (transactions) => transactions.filter((t) => t.type === 'SUBSCRIPTION')
);

/** Selector to get only cancellation transactions */
export const selectCancellationTransactions = createSelector(
  selectAllTransactions,
  (transactions) => transactions.filter((t) => t.type === 'CANCELLATION')
);
