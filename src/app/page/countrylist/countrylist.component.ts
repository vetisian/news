import { Apikey } from './../../model/models';
import { IndexedDbService } from './../../service/indexed-db.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styles: [
  ]
})
export class CountrylistComponent implements OnInit {

  apikey: Apikey[] = [];

  constructor(private idx: IndexedDbService, private route: Router) { }

  ngOnInit(): void {
    this.idx.getApiKey()
      .then(result => {
        this.apikey = result;
        console.log(result);
        if (result.length === 0) {
          this.route.navigate(['/apikey']);
        }
      });
  }

}
