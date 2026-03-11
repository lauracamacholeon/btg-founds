import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FundsService } from '../../services/funds.service';
import { loadFunds, loadFundsSuccess } from './funds.actions';

/**
 * FundsEffects - Handles all async operations related to funds
 */
@Injectable()
export class FundsEffects {
  /** Effect to load funds from the service when loadFunds action is dispatched */
  loadFunds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFunds),
      exhaustMap(() =>
        this.fundsService.getFunds().pipe(
          map((funds) => loadFundsSuccess({ funds })),
          catchError(() => of(loadFundsSuccess({ funds: [] })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private fundsService: FundsService) {}
}
