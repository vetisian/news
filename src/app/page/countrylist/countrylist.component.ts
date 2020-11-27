import { Apikey, Country } from './../../model/models';
import { IndexedDbService } from './../../service/indexed-db.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styles: [
  ]
})
export class CountrylistComponent implements OnInit {

  apikey: Apikey[] = [];
  countries: Country[] = [];
  countryApi = environment.countryApi;
  countryCodes = [
    'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz',
    'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp',
    'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt',
    'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
  ];

  constructor(private idx: IndexedDbService, private route: Router) {
    this.getCountryDataFromLocal();
  }

  async ngOnInit(): Promise<void> {
    this.idx.getApiKey()
      .then(result => {
        this.apikey = result;
        console.log(result);
        if (result.length === 0) {
          this.route.navigate(['/apikey']);
        }
      });
  }

  async getCountryDetail(): Promise<any> {
    this.countryCodes.forEach(async element => {
      const url = this.countryApi + element;
      const res: any = await fetch(url);
      const responseData: any = await res.json();
      console.log(element + ' info using Api:', responseData);
      this.idx.addCountryDetail({id: element, country: responseData.name, flag: responseData.flag});
      this.countries.push({id: element, country: responseData.name, flag: responseData.flag});
    });
  }

  async getCountryDataFromLocal(): Promise<any> {
    this.idx.getCountry()
      .then(result => {
        console.log('country data from db: ', result);
        if (result.length === 0) {
          this.getCountryDetail();
        } else {
          this.countries = result;
        }
      });
  }

}
