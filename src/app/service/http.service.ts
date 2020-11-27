import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  async getNewsByCid(): Promise<any> {
    return this.http.get(environment.newsUrl + 'us' + environment.newsApiKey);
  }

}
