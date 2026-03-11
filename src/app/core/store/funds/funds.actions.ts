import { createAction, props } from '@ngrx/store';
import { Fund } from '../../models/fund.model';
import { NotificationMethod } from '../../models/transaction.model';

/** Action to load all available funds */
export const loadFunds = createAction('[Funds] Load Funds');

/** Action dispatched when funds are loaded successfully */
export const loadFundsSuccess = createAction(
  '[Funds] Load Funds Success',
  props<{ funds: Fund[] }>()
);

/** Action to subscribe to a fund */
export const subscribeFund = createAction(
  '[Funds] Subscribe Fund',
  props<{ fundId: number; notificationMethod: NotificationMethod }>()
);

/** Action to cancel subscription to a fund */
export const cancelFund = createAction(
  '[Funds] Cancel Fund',
  props<{ fundId: number }>()
);
