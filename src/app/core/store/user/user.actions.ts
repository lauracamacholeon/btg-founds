import { createAction, props } from '@ngrx/store';

/** Action to load the initial user data */
export const loadUser = createAction('[User] Load User');

/** Action dispatched when user data is loaded successfully */
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ balance: number }>()
);

/** Action to update user balance after a transaction */
export const updateBalance = createAction(
  '[User] Update Balance',
  props<{ amount: number }>()
);
