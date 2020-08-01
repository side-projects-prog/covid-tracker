import { Action } from '@ngrx/store';
import { CovidNewsModel } from '../model/covid-news-model';

export enum NewsFetchActionTypes {
  NewsFetchSuccess = '[NewsFetch] Success API response with latest news',
  NewsFetchFailure = '[NewsFetch] Failed API response with latest news',
}

export class NewsFetchSuccess implements Action {
  readonly type = NewsFetchActionTypes.NewsFetchSuccess;
  constructor(public payload: { news: CovidNewsModel }) { }
}

export class NewsFetchFailure implements Action {
  readonly type = NewsFetchActionTypes.NewsFetchFailure;
  constructor(public payload: { error: any }) { }
}

export type NewsFetchActions = NewsFetchSuccess | NewsFetchFailure;

