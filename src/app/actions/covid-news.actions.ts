import { Action } from '@ngrx/store';

export enum CovidNewsActionTypes {
  RefreshNews = '[CovidNews] Refresh News'
}

export class RefreshNews implements Action {
  readonly type = CovidNewsActionTypes.RefreshNews;
  constructor(public country: string) { }
}

export type CovidNewsActions = RefreshNews;

