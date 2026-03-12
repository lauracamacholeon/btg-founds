import {
  transactionsReducer,
  initialTransactionsState,
} from './transactions.reducer';
import {
  addTransaction,
  loadTransactionsSuccess,
} from './transactions.actions';
import { Transaction } from '../../models/transaction.model';

/** Mock transaction for testing */
const mockTransaction: Transaction = {
  id: '123',
  fundId: 1,
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  type: 'SUBSCRIPTION',
  amount: 75000,
  date: new Date(),
  notificationMethod: 'EMAIL',
};

describe('TransactionsReducer', () => {
  /** Test initial state */
  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = transactionsReducer(undefined, action);
    expect(state).toEqual(initialTransactionsState);
  });

  /** Test initial transactions is empty */
  it('should have empty transactions array initially', () => {
    expect(initialTransactionsState.transactions.length).toBe(0);
  });

  /** Test loadTransactionsSuccess sets transactions */
  it('should set transactions when loadTransactionsSuccess is dispatched', () => {
    const action = loadTransactionsSuccess({ transactions: [mockTransaction] });
    const state = transactionsReducer(initialTransactionsState, action);
    expect(state.transactions.length).toBe(1);
    expect(state.transactions[0].fundName).toBe('FPV_BTG_PACTUAL_RECAUDADORA');
  });

  /** Test addTransaction adds to the beginning of the list */
  it('should add transaction to the beginning of the list', () => {
    const action = addTransaction({
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      transactionType: 'SUBSCRIPTION',
      amount: 75000,
      notificationMethod: 'EMAIL',
    });
    const state = transactionsReducer(initialTransactionsState, action);
    expect(state.transactions.length).toBe(1);
    expect(state.transactions[0].fundName).toBe('FPV_BTG_PACTUAL_RECAUDADORA');
    expect(state.transactions[0].type).toBe('SUBSCRIPTION');
  });

  /** Test addTransaction generates unique id */
  it('should generate unique id for each transaction', () => {
    const action = addTransaction({
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      transactionType: 'SUBSCRIPTION',
      amount: 75000,
      notificationMethod: 'EMAIL',
    });
    const state1 = transactionsReducer(initialTransactionsState, action);
    const state2 = transactionsReducer(initialTransactionsState, action);
    expect(state1.transactions[0].id).not.toBe(state2.transactions[0].id);
  });

  /** Test multiple transactions are added correctly */
  it('should add multiple transactions in correct order', () => {
    let state = transactionsReducer(
      initialTransactionsState,
      addTransaction({
        fundId: 1,
        fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
        transactionType: 'SUBSCRIPTION',
        amount: 75000,
        notificationMethod: 'EMAIL',
      })
    );
    state = transactionsReducer(
      state,
      addTransaction({
        fundId: 2,
        fundName: 'FPV_BTG_PACTUAL_ECOPETROL',
        transactionType: 'CANCELLATION',
        amount: 125000,
        notificationMethod: 'SMS',
      })
    );

    /** Most recent transaction should be first */
    expect(state.transactions.length).toBe(2);
    expect(state.transactions[0].fundName).toBe('FPV_BTG_PACTUAL_ECOPETROL');
    expect(state.transactions[1].fundName).toBe('FPV_BTG_PACTUAL_RECAUDADORA');
  });
});
