import { Action } from '@ngrx/store';
import { CovidNewsModel } from '../model/covid-news-model';
import { NewsFetchActions, NewsFetchActionTypes } from '../actions/news-fetch.actions';
import NewsUtils from '../utils/news-utils';


export const latestNewsFeatureKey = 'latestNews';

export interface NewsState {
  news: CovidNewsModel
  isError: boolean
  error: string
}

export const initialState: NewsState = {
  news: null,
  isError: true,
  error: "Failed to load news"
};

export function fetchNewsReducer(state = initialState, action: NewsFetchActions): NewsState {
  switch (action.type) {

    case NewsFetchActionTypes.NewsFetchSuccess:
      let currentNews = NewsUtils.createCovidNewsModel(action.payload);
      return {news: currentNews, isError: false, error: ""};

    case NewsFetchActionTypes.NewsFetchFailure:
      return {news: null, isError: true, error: "Failed to load news"};

    default:
      return state;
  }
}


