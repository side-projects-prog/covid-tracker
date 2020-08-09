import { Component, OnChanges, DoCheck, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
	ElementRef,
	AfterViewInit,
	ViewChild
} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
	title = 'Covid-Tracker';
	currentState: string = "Maharashtra";
	searchString;
	searchSubject$ = new Subject<string>();
	StateData: any = [{}];
	StateList: any = [];
	myControl = new FormControl();
	subscription$: Subscription;
	filteredOptions: Observable<String[]>
	@ViewChild('charts') public chartEl: ElementRef;
	//Stats
	total;
	deaths;
	recovered;
	data;
	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.myControl.setValue(this.currentState);

		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);

		this.http.get('https://covid-india-cases.herokuapp.com/states')
			.pipe()
			.subscribe(x => {

				for (const key in x) {
					this.StateList.push(x[key].state)
				}
			})

		this.http.get('https://covid-india-cases.herokuapp.com/states')
			.pipe()
			.subscribe(x => {

				for (const key in x) {
					this.StateData.push(x[key])
				}

				this.renderChart();
			})

	}
	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.StateList.filter(state =>
			state.toLowerCase().includes(filterValue)
		);
	}
	inputChanged($event) {

	}

	optionClick(data) {
		this.currentState = data
		this.renderChart();





	}
	charts = [];
	defaultOptions = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Stats per State'
		},
		tooltip: {
			pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %'
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: [{
				name: 'Total Cases',
				y: this.total
			}, {
				name: 'Deaths',
				y: this.deaths
			}, {
				name: 'Recovered',
				y: this.recovered
			}]
		}]
	}

	createChart(container, options?: Object) {
		let opts: any = this.defaultOptions;
		let e = document.createElement("div");

		container.appendChild(e);


		Highcharts.chart(container, opts);
	}



	renderChart() {
		for (var i = 0; i < 37; i++) {
			if (this.currentState === this.StateData[i].state) {
				this.deaths = this.StateData[i].deaths;
				this.total = this.StateData[i].noOfCases;
				this.recovered = this.StateData[i].cured;
				this.defaultOptions.series[0].data[0].y = this.StateData[i].noOfCases;
				this.defaultOptions.series[0].data[1].y = this.StateData[i].deaths;
				this.defaultOptions.series[0].data[2].y = this.StateData[i].cured;


				this.createChart(this.chartEl.nativeElement);
			}

		}
	}


}
