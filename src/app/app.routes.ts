import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'funds',
    pathMatch: 'full',
  },
  {
    /** Funds feature module - lazy loaded */
    path: 'funds',
    loadComponent: () =>
      import('./features/funds/pages/funds-page/funds-page.component').then(
        (m) => m.FundsPageComponent
      ),
  },
  {
    /** History feature module - lazy loaded */
    path: 'history',
    loadComponent: () =>
      import(
        './features/history/pages/history-page/history-page.component'
      ).then((m) => m.HistoryPageComponent),
  },
  {
    /** Redirect any unknown route to funds */
    path: '**',
    redirectTo: 'funds',
  },
];
