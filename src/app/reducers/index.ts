import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CountryState, refreshNewsReducer } from './covid-news.reducer';
import { NewsState, fetchNewsReducer } from './latest-news.reducer';


export interface State {
  country: CountryState,
  covidNews: NewsState
}

export const reducers: ActionReducerMap<State> = {
  country: refreshNewsReducer,
  covidNews: fetchNewsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
