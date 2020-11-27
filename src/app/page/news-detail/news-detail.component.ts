import { IndexedDbService } from './../../service/indexed-db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/model/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styles: [
  ]
})
export class NewsDetailComponent implements OnInit {

  cid: any;
  cname: any;
  news: News[] = [];

  constructor(private route: ActivatedRoute, private idx: IndexedDbService) { }

  async ngOnInit(): Promise<void> {
    this.cid = this.route.snapshot.paramMap.get('cid')?.toString();
    this.cname = this.route.snapshot.paramMap.get('cname')?.toString();
    console.log('country code: ' + this.cid);
    await this.getNewsDataFromLocal();
  }

  async getNewsDataFromLocal(): Promise<any> {
    this.idx.getNews(this.cid)
      .then(async result => {
        console.log('news data from db: ', result);
        if (result.length === 0) {
          this.getNewsByCid(this.cid);
        } else {
          const passedTime = (Date.now()) - result[0].id;
          if (passedTime > (environment.updateTimeMin * 60 * 1000)) {
            // delete old data from db
            await this.idx.deleteNews(this.cid);
            await this.getNewsByCid(this.cid);
          } else {
            this.news = result;
          }
        }
      });
  }

  async getNewsByCid(countryCode: any): Promise<any> {
    this.news = [];
    const res: any = await fetch(environment.newsUrl + countryCode + environment.newsApiKey);
    const responseData: any = await res.json();
    console.log(countryCode + ' news using Api:', responseData);
    const articles: any = await responseData.articles;
    articles.forEach(async (element: any) => {
      await this.idx.addNews({
        id: Date.now(),
        cid: countryCode,
        title: element.title,
        sourceName: element.source?.name,
        author: element.author,
        description: element.description,
        url: element.url,
        image: element.urlToImage,
        pubDateTime: element.publishedAt,
        content: element.content
      });
      this.news.push({
        id: Date.now(),
        cid: countryCode,
        title: element.title,
        sourceName: element.source?.name,
        author: element.author,
        description: element.description,
        url: element.url,
        image: element.urlToImage,
        pubDateTime: element.publishedAt,
        content: element.content
      });
    });
  }

}
