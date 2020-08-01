import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { RefreshNews } from '../actions/covid-news.actions';
import { NewsState } from '../reducers/latest-news.reducer';
import * as moment from 'moment';
import { Observable, interval} from 'rxjs';

@Component({
	selector: 'app-covid-news',
	templateUrl: './covid-news.component.html',
	styleUrls: ['./covid-news.component.css']
})
export class CovidNewsComponent implements OnInit {

	public latestNews: NewsState;
	elaspedTime: number = 0;
	timer$: Observable<number> = interval(10000);
	private timerSubscription;
	public currentCountry = "IN";

	public countries = [
		{ name: "India", code: "IN"},
		{ name: "USA", code: "US"},
		{ name: "Australia", code: "AU"},
		{ name: "China", code: "CN"},
		{ name: "France", code: "FR"}
	];

	constructor(private store: Store<State>) { }

	ngOnInit(): void {
		this.getLatestNews();

		this.timerSubscription = this.timer$.subscribe(
			value => {
				if (!this.latestNews.isError) {
					this.getElaspedTime(this.latestNews.news.lastUpdate);
				}
			}
		);

		this.refreshNews();
	}

	refreshNews() {
		let refreshNewsAction = new RefreshNews(this.currentCountry);
		this.store.dispatch(refreshNewsAction);
	}

	getLatestNews() {
		this.store.select(state => state.covidNews)
			.subscribe(newsState => this.latestNews = newsState);
	}

	getPublishedOnFormatting(date: Date): string {
		return moment(date).format('Do MMM YYYY, h:mm a')
	}

	getElaspedTime(date: Date) {
		console.log("now");
		let now = moment();
		let updatedAt = moment(date);
		this.elaspedTime = now.diff(updatedAt, 'minutes');
	}

	onNgDestroy() {
		this.timerSubscription.unsubscribe();
	}

}
