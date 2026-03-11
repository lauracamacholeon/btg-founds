import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { selectUserBalance } from './core/store/user/user.selectors';
import { loadUser } from './core/store/user/user.actions';
import { loadFunds } from './core/store/funds/funds.actions';

/**
 * AppComponent - Root component, handles navigation and initial data loading
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  /** Current user balance from the store */
  balance$: Observable<number>;

  constructor(private store: Store) {
    this.balance$ = this.store.select(selectUserBalance);
  }

  ngOnInit(): void {
    /** Dispatch initial data loading actions */
    this.store.dispatch(loadUser());
    this.store.dispatch(loadFunds());
  }
}
