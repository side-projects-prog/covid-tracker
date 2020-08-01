import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovidNewsComponent } from './covid-news/covid-news.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LatestNewsEffects } from './effects/latest-news.effects';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { NewsService } from './services/news.service';

@NgModule({
  declarations: [
    AppComponent,
    CovidNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forFeature([LatestNewsEffects]),
    EffectsModule.forRoot([])
  ],
  providers: [
    NewsService,
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
