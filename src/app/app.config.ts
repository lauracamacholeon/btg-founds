import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { userReducer } from './core/store/user/user.reducer';
import { fundsReducer } from './core/store/funds/funds.reducer';
import { transactionsReducer } from './core/store/transactions/transactions.reducer';

import { FundsEffects } from './core/store/funds/funds.effects';
import { UserEffects } from './core/store/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),

    /** Register all NgRx reducers */
    provideStore({
      user: userReducer,
      funds: fundsReducer,
      transactions: transactionsReducer,
    }),

    /** Register NgRx Effects */
    provideEffects([FundsEffects, UserEffects]),

    /** NgRx DevTools - only in development */
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
