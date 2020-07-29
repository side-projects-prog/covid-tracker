import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovidNewsComponent } from './covid-news/covid-news.component';


const routes: Routes = [
  {path: "news", component: CovidNewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
