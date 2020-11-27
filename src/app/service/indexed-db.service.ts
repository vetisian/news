import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Apikey, Country, News } from './../model/models';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService extends Dexie {

  private apikey: Dexie.Table<Apikey, string>;
  private country: Dexie.Table<Country, string>;
  private news: Dexie.Table<News, string>;

  constructor() {
    // database name
    super('newsdb');

    // setup the schema for v1
    this.version(1).stores({
      apikey: 'apikey'
    });
    this.version(1).stores({
      country: 'id, country, flag'
    });
    this.version(1).stores({
      news: 'id, cid, title, sourceName, author, description, url, image, pubDateTime, content'
    });

    // get a reference to the collections
    this.apikey = this.table('apikey');
    this.country = this.table('country');
    this.news = this.table('news');
  }

  async getApiKey(): Promise<Apikey[]> {
    return ((await this.apikey.toArray())
      .map(d => {
        return {
          apikey: d.apikey
        } as Apikey;
      }));
  }

  async getCountry(): Promise<Country[]> {
    return (await this.country.toArray())
      .map(d => {
        return {
          id: d.id,
          country: d.country,
          flag: d.flag
        } as Country;
      });
  }

  async getNews(cid: any): Promise<News[]> {
    return (await this.news.where('cid').equals(cid).toArray())
      .map(d => {
        return {
          id: d.id,
          cid: d.cid,
          title: d.title,
          sourceName: d.sourceName,
          author: d.author,
          description: d.description,
          url: d.url,
          image: d.image,
          pubDateTime: d.pubDateTime,
          content: d.content
        } as News;
      });
  }

  async deleteNews(cid: any): Promise<any> {
    return (await this.news.where('cid').equals(cid).delete());
  }

  async addApiKey(t: Apikey): Promise<any> {
    return await this.apikey.put(t);
  }

  async deleteApiKey(): Promise<any> {
    return await this.apikey.clear();
  }

  async addCountryDetail(t: Country): Promise<any> {
    return await this.country.put(t);
  }

  async addNews(t: News): Promise<any> {
    return await this.news.put(t);
  }
}
