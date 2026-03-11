import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Fund } from '../models/fund.model';
import { Transaction } from '../models/transaction.model';
import { MOCK_FUNDS, MOCK_USER } from './mock-data';

/**
 * FundsService - Handles all fund-related operations
 * Simulates REST API calls using mock data
 */
@Injectable({
  providedIn: 'root',
})
export class FundsService {
  /** Simulates GET /funds - returns all available funds */
  getFunds(): Observable<Fund[]> {
    return of(MOCK_FUNDS).pipe(delay(500));
  }

  /** Simulates GET /user/balance - returns current user balance */
  getUserBalance(): Observable<number> {
    return of(MOCK_USER.balance).pipe(delay(300));
  }

  /** Simulates GET /transactions - returns transaction history */
  getTransactions(): Observable<Transaction[]> {
    return of([]).pipe(delay(300));
  }
}
