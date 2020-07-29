import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
	selector: 'app-covid-news',
	templateUrl: './covid-news.component.html',
	styleUrls: ['./covid-news.component.css']
})
export class CovidNewsComponent implements OnInit {

	myObservable$;
	mySubject$;

	constructor() { }

	ngOnInit(): void {

		this.myObservable$ = new Observable(
			subscriber => {
				subscriber.next(10);
				subscriber.next(11);
				setTimeout(
					() => {
						subscriber.next(111);
						// subscriber.complete();
					}, 1000
				)
			}
		)

		// console.log("now we will subscribe our observable");
		// this.myObservable$.subscribe({
		// 	next(element: number) { console.log(element) },
		// 	error(err) { console.log(err) },
		// 	complete() { console.log("done") }
		// })

		console.log("subject now")
		this.mySubject$ = new ReplaySubject<number>();
		this.mySubject$.next(1);
		this.mySubject$.next(2);
		this.mySubject$.next(3);
		this.mySubject$.subscribe(x => console.log("here", x));

	}

	ngOnDestroy() {
		this.myObservable$.unsubscribe();
	}
}
