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
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from './services/news.service';
import { MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import { StatisticsComponent } from './statistics/statistics.component';






@NgModule({
  declarations: [
    AppComponent,
    CovidNewsComponent,
    StatisticsComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatRippleModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
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
