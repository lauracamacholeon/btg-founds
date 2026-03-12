import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Transaction } from '../../../../core/models/transaction.model';
import { selectAllTransactions } from '../../../../core/store/transactions/transactions.selectors';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';

/**
 * HistoryPageComponent - Displays the full transaction history
 */
@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
    CopCurrencyPipe,
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
})
export class HistoryPageComponent {
  /** All transactions from the store */
  transactions$: Observable<Transaction[]>;

  /** Active filter - using signal for local state */
  activeFilter = signal<'ALL' | 'SUBSCRIPTION' | 'CANCELLATION'>('ALL');

  private store = inject(Store);

  constructor() {
    this.transactions$ = this.store.select(selectAllTransactions);
  }

  /**
   * Sets the active filter for transactions
   */
  setFilter(filter: 'ALL' | 'SUBSCRIPTION' | 'CANCELLATION'): void {
    this.activeFilter.set(filter);
  }

  /**
   * Filters transactions based on the active filter
   */
  filterTransactions(transactions: Transaction[]): Transaction[] {
    if (this.activeFilter() === 'ALL') return transactions;
    return transactions.filter((t) => t.type === this.activeFilter());
  }

  /**
   * Returns the icon based on transaction type
   */
  getTransactionIcon(type: string): string {
    return type === 'SUBSCRIPTION' ? 'add_circle' : 'cancel';
  }
}
