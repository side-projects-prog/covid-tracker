import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NewsFetchSuccess, NewsFetchFailure } from '../actions/news-fetch.actions';
import { CovidNewsActions, CovidNewsActionTypes } from '../actions/covid-news.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { NewsService } from '../services/news.service';



@Injectable()
export class LatestNewsEffects {

	@Effect()
	latestNews$: Observable<any> = this.actions$.pipe(
		ofType(CovidNewsActionTypes.RefreshNews),
		mergeMap(action =>
			this.newsService.fetchLatestNews(action.country)
				.pipe(
					map(data => new NewsFetchSuccess(data)),
					catchError(err => of(new NewsFetchFailure(err)))
				)
		)
	);

	constructor(private actions$: Actions<CovidNewsActions>,
		private newsService: NewsService) { }
}
