import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';
import {
  addTransaction,
  loadTransactionsSuccess,
} from './transactions.actions';
import { v4 as uuidv4 } from 'uuid';

/** Transactions state interface */
export interface TransactionsState {
  transactions: Transaction[];
}

/** Initial transactions state */
export const initialTransactionsState: TransactionsState = {
  transactions: [],
};

export const transactionsReducer = createReducer(
  initialTransactionsState,
  on(loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
  })),
  on(
    addTransaction,
    (
      state,
      { fundId, fundName, transactionType, amount, notificationMethod }
    ) => ({
      ...state,
      transactions: [
        {
          id: uuidv4(),
          fundId,
          fundName,
          type: transactionType,
          amount,
          date: new Date(),
          notificationMethod,
        },
        ...state.transactions,
      ],
    })
  )
);
