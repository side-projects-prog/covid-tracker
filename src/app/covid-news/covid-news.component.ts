import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { RefreshNews } from '../actions/covid-news.actions';
import { NewsState } from '../reducers/latest-news.reducer';

@Component({
	selector: 'app-covid-news',
	templateUrl: './covid-news.component.html',
	styleUrls: ['./covid-news.component.css']
})
export class CovidNewsComponent implements OnInit {

	public latestNews: NewsState;

	constructor(private store: Store<State>) { }

	ngOnInit(): void {
		this.getLatestNews();
	}

	refreshNews(country: string) {
		let refreshNewsAction = new RefreshNews(country);
		this.store.dispatch(refreshNewsAction);
	}

	getLatestNews() {
		this.store.select(state => state.covidNews)
			.subscribe(newsState => this.latestNews = newsState);
	}

}
