import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FundsService } from '../../services/funds.service';
import { loadUser, loadUserSuccess } from './user.actions';

/**
 * UserEffects - Handles all async operations related to user
 */
@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private fundsService = inject(FundsService);

  /** Effect to load user balance when loadUser action is dispatched */
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      exhaustMap(() =>
        this.fundsService.getUserBalance().pipe(
          map((balance) => loadUserSuccess({ balance })),
          catchError(() => of(loadUserSuccess({ balance: 500000 })))
        )
      )
    )
  );
}
