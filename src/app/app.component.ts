import { Component, OnDestroy, OnInit } from '@angular/core';
import { RatesService } from './services/rates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private ratesService: RatesService) {}

  ngOnInit(): void {
    this.ratesService.startIntervalFetching();
  }

  ngOnDestroy(): void {
    this.ratesService.stopIntervalFetching(); 
  }
}
