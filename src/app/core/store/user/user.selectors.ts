import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

/** Feature selector for the user state */
export const selectUserState = createFeatureSelector<UserState>('user');

/** Selector to get the current user balance */
export const selectUserBalance = createSelector(
  selectUserState,
  (state) => state.balance
);
