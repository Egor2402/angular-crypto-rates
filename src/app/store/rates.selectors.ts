import { createSelector } from "@ngrx/store";
import { AppState, RatesState } from "../types/rates";


export const selectRates = createSelector(
  ({ rates }: AppState) => rates,
  (state: RatesState) => state.ratesData,
);