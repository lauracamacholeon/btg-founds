import { createReducer, on } from '@ngrx/store';
import { loadUserSuccess, updateBalance } from './user.actions';

/** User state interface */
export interface UserState {
  balance: number;
}

/** Initial user state with COP $500.000 */
export const initialUserState: UserState = {
  balance: 500000,
};

export const userReducer = createReducer(
  initialUserState,
  on(loadUserSuccess, (state, { balance }) => ({
    ...state,
    balance,
  })),
  on(updateBalance, (state, { amount }) => ({
    ...state,
    balance: state.balance + amount,
  }))
);
