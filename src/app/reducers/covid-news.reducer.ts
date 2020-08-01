import { Action } from '@ngrx/store';
import { CovidNewsModel } from '../model/covid-news-model';
import { CovidNewsActions, CovidNewsActionTypes } from '../actions/covid-news.actions';


export const covidNewsFeatureKey = 'covidNews';

export interface CountryState {
  country: string
}

export const initialState: CountryState = {
  country: null
};

export function refreshNewsReducer(state = initialState, action: CovidNewsActions): CountryState {
  switch (action.type) {
    case CovidNewsActionTypes.RefreshNews:
      return {country: action.country};

    default:
      return state;
  }
}
