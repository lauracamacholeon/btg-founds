import { createAction, props } from '@ngrx/store';
import {
  Transaction,
  NotificationMethod,
} from '../../models/transaction.model';

/** Action to add a new transaction to the history */
export const addTransaction = createAction(
  '[Transactions] Add Transaction',
  props<{
    fundId: number;
    fundName: string;
    transactionType: 'SUBSCRIPTION' | 'CANCELLATION';
    amount: number;
    notificationMethod: NotificationMethod;
  }>()
);

/** Action to load all transactions */
export const loadTransactions = createAction(
  '[Transactions] Load Transactions'
);

/** Action dispatched when transactions are loaded successfully */
export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);
