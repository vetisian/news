import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // function to get country detail info
  async getCountryDetail(apiUrl: any): Promise<any> {
    return this.http.get(apiUrl);
  }

}
