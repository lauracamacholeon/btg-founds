import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Fund } from '../../../../core/models/fund.model';
import {
  selectAllFunds,
  selectFundsLoading,
} from '../../../../core/store/funds/funds.selectors';
import { selectUserBalance } from '../../../../core/store/user/user.selectors';
import {
  subscribeFund,
  cancelFund,
} from '../../../../core/store/funds/funds.actions';
import { updateBalance } from '../../../../core/store/user/user.actions';
import { addTransaction } from '../../../../core/store/transactions/transactions.actions';
import { NotificationMethod } from '../../../../core/models/transaction.model';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';

/**
 * FundsPageComponent - Main page for displaying and managing investment funds
 */
@Component({
  selector: 'app-funds-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    CopCurrencyPipe,
    MatTooltipModule,
  ],
  templateUrl: './funds-page.component.html',
  styleUrl: './funds-page.component.scss',
})
export class FundsPageComponent implements OnInit {
  /** All funds from the store */
  funds$: Observable<Fund[]>;

  /** Loading state from the store */
  loading$: Observable<boolean>;

  /** Current user balance from the store */
  balance$: Observable<number>;

  /** Current balance value for validation */
  currentBalance = signal(500000);

  /** Selected notification method - using signal for local state */
  selectedNotification = signal<NotificationMethod>('EMAIL');

  constructor(private store: Store, private snackBar: MatSnackBar) {
    this.funds$ = this.store.select(selectAllFunds);
    this.loading$ = this.store.select(selectFundsLoading);
    this.balance$ = this.store.select(selectUserBalance);
  }

  ngOnInit(): void {
    /** Subscribe to balance changes to keep local signal updated */
    this.balance$.subscribe((balance) => {
      this.currentBalance.set(balance);
    });
  }

  onSubscribe(fund: Fund): void {
    if (this.currentBalance() < fund.minimumAmount) {
      this.snackBar.open(
        `Insufficient balance. You need ${fund.minimumAmount.toLocaleString(
          'es-CO',
          { style: 'currency', currency: 'COP' }
        )} to subscribe to ${fund.name}`,
        'Close',
        { duration: 5000, panelClass: ['snack-error'] }
      );
      return;
    }

    this.store.dispatch(
      subscribeFund({
        fundId: fund.id,
        notificationMethod: this.selectedNotification(),
      })
    );
    this.store.dispatch(updateBalance({ amount: -fund.minimumAmount }));
    this.store.dispatch(
      addTransaction({
        fundId: fund.id,
        fundName: fund.name,
        transactionType: 'SUBSCRIPTION',
        amount: fund.minimumAmount,
        notificationMethod: this.selectedNotification(),
      })
    );

    this.snackBar.open(`Successfully subscribed to ${fund.name}`, 'Close', {
      duration: 3000,
      panelClass: ['snack-success'],
    });
  }

  onCancel(fund: Fund): void {
    this.store.dispatch(cancelFund({ fundId: fund.id }));
    this.store.dispatch(updateBalance({ amount: fund.minimumAmount }));
    this.store.dispatch(
      addTransaction({
        fundId: fund.id,
        fundName: fund.name,
        transactionType: 'CANCELLATION',
        amount: fund.minimumAmount,
        notificationMethod: this.selectedNotification(),
      })
    );

    this.snackBar.open(
      `Successfully cancelled subscription to ${fund.name}`,
      'Close',
      { duration: 3000, panelClass: ['snack-success'] }
    );
  }

  setNotification(method: NotificationMethod): void {
    this.selectedNotification.set(method);
  }
}
