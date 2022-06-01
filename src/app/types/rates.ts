export interface Rate {
  name: string;
  type: string;
  unit: string;
  value: number;
}

export interface RatesResponse {
  rates: {
    [key: string]: Rate;
  }
}

export interface RatesState {
  ratesData: {
    rates: {
      [key: string]: Rate;
    };
    fetchedDateTime: number;
  }[];
}

export interface AppState {
  rates: RatesState;
}