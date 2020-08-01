import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }


  public fetchLatestNews(country: string): Observable<any> {

    const headerDict = {
      'Subscription-Key': GlobalConstants.COVID_NEWS_API_SUBSCRIPTION_KEY
    }

    var newsUrl = GlobalConstants.COVID_NEWS_API_BASE_URL + country;

    var headers = new HttpHeaders(headerDict);

    return this.http.get(newsUrl, {headers: headers})
  }

}
