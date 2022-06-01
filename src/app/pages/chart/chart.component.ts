import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RatesService } from 'src/app/services/rates.service';
import { selectRates } from 'src/app/store/rates.selectors';
import { AppState, RatesState } from 'src/app/types/rates';

interface ChartRate {
  name: string;
  series: {
    name: string;
    value: number;
  }[]
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartRates: ChartRate[] = [];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Rate';
  timeline: boolean = true;

  rates$: Observable<RatesState['ratesData']> = this.store.pipe(
    select(selectRates)
  );

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rates$.subscribe((rates) => {
      if (!rates.length) return;

      this.chartRates = Object.keys(rates[0].rates).map((currencyKey) => {
        return {
          name: rates[0].rates[currencyKey].name,
          series: rates.map(({ fetchedDateTime, rates }) => {
            return {
              name: new Date(fetchedDateTime).toString(),
              value: rates[currencyKey].value
            }
          })
        };
      });
    });
  }

}