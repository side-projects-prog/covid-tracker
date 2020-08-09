import { Component, OnChanges, DoCheck, OnInit } from '@angular/core';
import {Subject} from 'rxjs'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {FormControl , ReactiveFormsModule} from '@angular/forms';
import { Subscription } from 'rxjs';
import {take,first} from 'rxjs/operators';
import {
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
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
searchString;
searchSubject$ = new Subject<string>();
 StateData  :any= [{}];
 StateList :any=[];
 myControl = new FormControl();
 subscription$ : Subscription;
 filteredOptions : Observable<String[]>
 @ViewChild('charts') public chartEl: ElementRef;
//Stats
total;
deaths;
recovered;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  
    this.http.get('https://covid-india-cases.herokuapp.com/states')
    .pipe()
    .subscribe(x=>{
      
      for(const key in x)
      {
        this.StateList.push(x[key].state)
      }
     // console.log(this.StateList)
    })
  
    this.http.get('https://covid-india-cases.herokuapp.com/states')
    .pipe()
    .subscribe(x=>{
      
      for(const key in x)
      {
        this.StateData.push(x[key])
      }
     // console.log(this.StateData)
    })
  
  }
  private _filter(value:string) : string[]
  {
    const filterValue = value.toLowerCase();
    return this.StateList.filter(state =>
      state.toLowerCase().includes(filterValue)
      );
     }
     inputChanged($event)
     {
       //this.searchSubject$.next($event)
     
     }

     optionClick(data)
     {
      // console.log('this is test')
       //tconsole.log(data);
       this.defaultOptions.series[0].data[0].y = this.StateData[2].deaths
       //console.log(this.defaultOptions.series[0].data)
       
       for(var i=0; i<37 ; i++)
       {
         if(data === this.StateData[i].state)
         {
           //console.log('Total Deaths ' , this.StateData[i].deaths)
           this.deaths = this.StateData[i].deaths;
           //console.log('Number Of Cases',this.StateData[i].noOfCases)
           this.total = this.StateData[i].noOfCases;
           //console.log('Number Of Cases',this.StateData[i].cured)
           this.recovered = this.StateData[i].cured;
           this.defaultOptions.series[0].data[0].y = this.StateData[i].noOfCases;
           this.defaultOptions.series[0].data[1].y=this.StateData[i].deaths;
           this.defaultOptions.series[0].data[2].y=this.StateData[i].cured;
           
   
          this.createChart(this.chartEl.nativeElement);
         }
         
       }
       
   //service
   
   
      //console.log(this.StateData)
   
       
     }
     charts = [];
  defaultOptions = {
    chart : {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title : {
      text : 'Stats per State'
    },
    tooltip:{
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions:{
      pie:{
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            // style: {
            //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            // }
        },
        showInLegend: true
      }
    },
    series :[{
      name: 'Brands',
      colorByPoint: true,
      data: [ {
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
  }//default end

  createChart(container, options?: Object) {
    let opts :any= this.defaultOptions;
   // console.log(opts)
    let e = document.createElement("div");
    
    container.appendChild(e);
    
    if(opts.chart) {
     // opts.chart['renderTo'] = e;
    }
    Highcharts.chart(container, opts);
  }   


}
