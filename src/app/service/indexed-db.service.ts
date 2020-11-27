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
      country: 'id, country'
    });
    this.version(1).stores({
      news: 'id, title, link'
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
          country: d.country
        } as Country;
      });
  }

  async getNews(): Promise<News[]> {
    return (await this.news.toArray())
      .map(d => {
        return {
          id: d.id,
          title: d.title,
          link: d.link
        } as News;
      });
  }

  async addApiKey(t: Apikey): Promise<any> {
    return await this.apikey.put(t);
  }

  async deleteApiKey(): Promise<any> {
    return await this.apikey.clear();
  }

  async addCountry(t: Country): Promise<any> {
    return await this.country.put(t);
  }

  async addNews(t: News): Promise<any> {
    return await this.news.put(t);
  }
}
