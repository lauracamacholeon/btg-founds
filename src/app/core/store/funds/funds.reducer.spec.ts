import { fundsReducer, initialFundsState } from './funds.reducer';
import {
  loadFunds,
  loadFundsSuccess,
  subscribeFund,
  cancelFund,
} from './funds.actions';
import { Fund } from '../../models/fund.model';

/** Mock funds for testing */
const mockFunds: Fund[] = [
  {
    id: 1,
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minimumAmount: 75000,
    category: 'FPV',
    isSubscribed: false,
  },
  {
    id: 2,
    name: 'FPV_BTG_PACTUAL_ECOPETROL',
    minimumAmount: 125000,
    category: 'FPV',
    isSubscribed: false,
  },
];

describe('FundsReducer', () => {
  /** Test initial state */
  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN' } as { type: string };
    const state = fundsReducer(undefined, action);
    expect(state).toEqual(initialFundsState);
  });

  /** Test loadFunds sets loading to true */
  it('should set loading to true when loadFunds is dispatched', () => {
    const action = loadFunds();
    const state = fundsReducer(initialFundsState, action);
    expect(state.loading).toBe(true);
  });

  /** Test loadFundsSuccess sets funds and loading to false */
  it('should set funds and loading to false when loadFundsSuccess is dispatched', () => {
    const action = loadFundsSuccess({ funds: mockFunds });
    const state = fundsReducer(initialFundsState, action);
    expect(state.funds).toEqual(mockFunds);
    expect(state.loading).toBe(false);
  });

  /** Test subscribeFund sets isSubscribed to true */
  it('should set isSubscribed to true when subscribeFund is dispatched', () => {
    const stateWithFunds = { ...initialFundsState, funds: mockFunds };
    const action = subscribeFund({ fundId: 1, notificationMethod: 'EMAIL' });
    const state = fundsReducer(stateWithFunds, action);
    expect(state.funds[0].isSubscribed).toBe(true);
    expect(state.funds[1].isSubscribed).toBe(false);
  });

  /** Test cancelFund sets isSubscribed to false */
  it('should set isSubscribed to false when cancelFund is dispatched', () => {
    const subscribedFunds: Fund[] = [
      { ...mockFunds[0], isSubscribed: true },
      { ...mockFunds[1], isSubscribed: false },
    ];
    const stateWithFunds = { ...initialFundsState, funds: subscribedFunds };
    const action = cancelFund({ fundId: 1 });
    const state = fundsReducer(stateWithFunds, action);
    expect(state.funds[0].isSubscribed).toBe(false);
  });
});
