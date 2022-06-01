import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RatesEffects } from './store/rates.effects';
import { ratesReducer } from './store/rates.reducer';
import { ChartComponent } from './pages/chart/chart.component';
import { RatesListComponent } from './components/rates-list/rates-list.component';
import { GridComponent } from './pages/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RatesListComponent,
    HomeComponent,
    ChartComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    NgxChartsModule,
    StoreModule.forRoot({ rates: ratesReducer }),
    EffectsModule.forRoot([RatesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
