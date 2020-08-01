import { NewsDetails } from '../model/news-details';
import { CovidNewsModel } from '../model/covid-news-model';
import * as moment from 'moment';

export default class NewsUtils {

    public static createCovidNewsDetails(data: any) : NewsDetails {

        let newsDetails: NewsDetails = new NewsDetails();
        newsDetails.title =  data.title;
        newsDetails.summary = data.excerpt;
        newsDetails.fullArticlePath = data.webUrl;

        if (data.images?.length > 1) {
            let firstImage = data.images[0];
            newsDetails.imageUrl = firstImage.url;
        }

        newsDetails.provider = data.provider?.name;
        newsDetails.providerUrl = data.provider?.domain;

        if (data.publishedDateTime) {
            newsDetails.publishedAt = moment(data.publishedDateTime).toDate();
        }

        return newsDetails;
    }

    public static createCovidNewsModel(data: any) : CovidNewsModel {

        let covidNews: CovidNewsModel = new CovidNewsModel();
        covidNews.lastUpdate = moment(data.publishedDateTime).toDate();
        let news: Array<NewsDetails> = []

        for (let i = 0; i < data.news.length; i++) {
            let currentNews = this.createCovidNewsDetails(data.news[i]);
            news.push(currentNews);
        }
        covidNews.news = news;

        return covidNews;
    }

}
