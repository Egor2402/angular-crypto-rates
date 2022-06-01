import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, interval, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { fetchRates } from '../store/rates.actions';
import { AppState, RatesResponse } from '../types/rates';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  intervalValue$ = new BehaviorSubject<number>(15000);

  fetchIntervalSubscription?: Subscription;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  startIntervalFetching(): void {
    if (this.fetchIntervalSubscription) return;

    this.fetchIntervalSubscription = this.intervalValue$.pipe(
      switchMap(intervalValue =>
        interval(intervalValue).pipe(startWith(0))
      ),
    ).subscribe(() => {
      this.store.dispatch(fetchRates());
    });
  }

  stopIntervalFetching(): void {
    this.fetchIntervalSubscription?.unsubscribe();
  }

  fetchRates(): Observable<RatesResponse> {
    return this.http.get<RatesResponse>('https://api.coingecko.com/api/v3/exchange_rates');
  }
}
