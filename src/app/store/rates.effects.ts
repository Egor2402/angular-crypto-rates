import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { RatesService } from '../services/rates.service';
import { fetchRates, fetchRatesSuccess } from './rates.actions';

@Injectable()
export class RatesEffects {
  fetchRates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchRates),
      mergeMap(() =>
        this.ratesService.fetchRates().pipe(
          map((rates) => fetchRatesSuccess({ data: rates }))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private ratesService: RatesService
  ) { }
}