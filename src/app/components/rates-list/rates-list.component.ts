import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, interval, Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RatesService } from 'src/app/services/rates.service';
import { fetchRates, resetRates } from 'src/app/store/rates.actions';
import { selectRates } from 'src/app/store/rates.selectors';
import { AppState, RatesState } from 'src/app/types/rates';

interface GridRate {
  name: string;
  currentRate: number;
  diff: number;
  maxRate: number;
  minRate: number;
  average1Min: number;
  average2Min: number;
  average3Min: number;
  average5Min: number;
}

const ONE_MIN_IN_MS = 60 * 1000;
const TWO_MIN_IN_MS = 2 * 60 * 1000;
const THREE_MIN_IN_MS = 3 * 60 * 1000;
const FIVE_MIN_IN_MS = 5 * 60 * 1000;

@Component({
  selector: 'app-rates-list',
  templateUrl: './rates-list.component.html',
  styleUrls: ['./rates-list.component.scss']
})
export class RatesListComponent implements OnInit, OnDestroy {
  @Input() configurable: boolean = false;
  @Input() filterable: boolean = false;

  rates$: Observable<RatesState['ratesData']> = this.store.pipe(
    select(selectRates)
  );

  intervalValue$: BehaviorSubject<number>;

  filterName: string = '';

  showIconsDuration: number = 1000;

  isIconsShown: boolean = false;

  gridRates: GridRate[] = [];

  fetchIntervalSubscription?: Subscription;
  showIconsSubscription?: Subscription;

  displayedColumns: string[] = ['name', 'currentRate', 'maxRate', 'minRate', 'average1Min', 'average2Min', 'average3Min', 'average5Min'];

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private ratesService: RatesService,
  ) {
    this.intervalValue$ = this.ratesService.intervalValue$;
  }

  ngOnInit(): void {
    this.rates$.subscribe((ratesData) => {
      const currRates = ratesData[ratesData.length - 1]?.rates;

      if (!currRates) {
        this.gridRates = [];
        return;
      }

      this.isIconsShown = true;
      this.showIconsSubscription = interval(this.showIconsDuration).pipe(take(1)).subscribe(() => {
        this.isIconsShown = false;
      });

      const prevRates = ratesData[ratesData.length - 2]?.rates;

      const now = Date.now();

      this.gridRates = Object.keys(currRates).map((currencyKey: string) => {
        const allCurrencyValues = ratesData.map((ratesItem) => (
          { value: ratesItem.rates[currencyKey].value, dateTime: ratesItem.fetchedDateTime }
        ));

        const last1MinValues = allCurrencyValues.filter((rates) => now - rates.dateTime <= ONE_MIN_IN_MS);
        const last2MinValues = allCurrencyValues.filter((rates) => now - rates.dateTime <= TWO_MIN_IN_MS);
        const last3MinValues = allCurrencyValues.filter((rates) => now - rates.dateTime <= THREE_MIN_IN_MS);
        const last5MinValues = allCurrencyValues.filter((rates) => now - rates.dateTime <= FIVE_MIN_IN_MS);

        return {
          name: currRates[currencyKey].name,
          currentRate: currRates[currencyKey].value,
          diff: prevRates ? currRates[currencyKey].value - prevRates[currencyKey].value : 0,
          maxRate: Math.max(...allCurrencyValues.map(({ value }) => value)),
          minRate: Math.min(...allCurrencyValues.map(({ value }) => value)),
          average1Min: +(last1MinValues.reduce((sum, data) => sum + data.value, 0) / last1MinValues.length).toFixed(3),
          average2Min: +(last2MinValues.reduce((sum, data) => sum + data.value, 0) / last2MinValues.length).toFixed(3),
          average3Min: +(last3MinValues.reduce((sum, data) => sum + data.value, 0) / last3MinValues.length).toFixed(3),
          average5Min: +(last5MinValues.reduce((sum, data) => sum + data.value, 0) / last5MinValues.length).toFixed(3)
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.showIconsSubscription?.unsubscribe();
  }

  handleClearData(): void {
    this.store.dispatch(resetRates());
    this.store.dispatch(fetchRates());
  }

  handleLogOut(): void {
    this.authService.logOut().subscribe(() => {
      this.store.dispatch(resetRates());
      this.router.navigate(['/login']);
    });
  }

  getFilteredData(): GridRate[] {
    if (!this.filterable || !this.filterName) return this.gridRates;

    return this.gridRates.filter(({ name }) => name.toLowerCase().includes(this.filterName.toLowerCase()));
  }
}
