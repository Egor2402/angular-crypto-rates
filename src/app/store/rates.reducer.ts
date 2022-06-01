import { createReducer, on } from '@ngrx/store';
import { RatesState } from '../types/rates';
import { fetchRates, fetchRatesSuccess, resetRates } from './rates.actions';

export const initialState: RatesState = { ratesData: [] };

export const ratesReducer = createReducer(
  initialState,
  on(fetchRates, (state) => state),
  on(fetchRatesSuccess, (state, { data }) => {
    const cryptoRates = Object.keys(data.rates).reduce((cryptoData, currencyKey) => {
      if (data.rates[currencyKey].type === 'crypto') {
        return { ...cryptoData, [currencyKey]: data.rates[currencyKey] };
      }
      return cryptoData;
    }, {});

    return {
      ratesData: [
        ...state.ratesData,
        {
          rates: cryptoRates,
          fetchedDateTime: Date.now()
        }
      ]
    };
  }),
  on(resetRates, () => initialState),
);