import { userReducer, initialUserState } from './user.reducer';
import { loadUserSuccess, updateBalance } from './user.actions';

describe('UserReducer', () => {
  /** Test initial state */
  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = userReducer(undefined, action);
    expect(state).toEqual(initialUserState);
  });

  /** Test initial balance is 500000 */
  it('should have initial balance of 500000', () => {
    expect(initialUserState.balance).toBe(500000);
  });

  /** Test loadUserSuccess sets balance */
  it('should set balance when loadUserSuccess is dispatched', () => {
    const action = loadUserSuccess({ balance: 500000 });
    const state = userReducer(initialUserState, action);
    expect(state.balance).toBe(500000);
  });

  /** Test updateBalance subtracts amount on subscription */
  it('should subtract amount from balance on subscription', () => {
    const action = updateBalance({ amount: -75000 });
    const state = userReducer(initialUserState, action);
    expect(state.balance).toBe(425000);
  });

  /** Test updateBalance adds amount on cancellation */
  it('should add amount to balance on cancellation', () => {
    const stateWithLowBalance = { balance: 425000 };
    const action = updateBalance({ amount: 75000 });
    const state = userReducer(stateWithLowBalance, action);
    expect(state.balance).toBe(500000);
  });

  /** Test balance never goes below zero logic */
  it('should correctly calculate balance after multiple transactions', () => {
    let state = userReducer(
      initialUserState,
      updateBalance({ amount: -75000 })
    );
    state = userReducer(state, updateBalance({ amount: -125000 }));
    state = userReducer(state, updateBalance({ amount: -100000 }));
    expect(state.balance).toBe(200000);
  });
});
