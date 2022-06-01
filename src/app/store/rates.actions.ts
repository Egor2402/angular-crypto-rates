
import { createAction, props } from '@ngrx/store';
import { RatesResponse } from '../types/rates';

export const fetchRates = createAction('[Crypto Rates] Fetch Rates');
export const fetchRatesSuccess = createAction('[Crypto Rates] Fetch Rates Success', props<{ data: RatesResponse }>());
export const resetRates = createAction('[Crypto Rates] Reset Rates');