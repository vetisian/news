import { Router } from '@angular/router';
import { Apikey } from './../../model/models';
import { IndexedDbService } from './../../service/indexed-db.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apikey',
  templateUrl: './apikey.component.html',
  styles: [
  ]
})
export class ApikeyComponent implements OnInit {

  inputVal = '';
  savedFlag = false;

  constructor(private idx: IndexedDbService, private route: Router) { }

  ngOnInit(): void {
    this.idx.getApiKey()
      .then(result => {
        console.log(result);
        if (result.length !== 0) {
          this.inputVal = result[0].apikey?.toString();
          this.savedFlag = true;
        }
      });
  }

  async addApiKey(val: any): Promise<void> {
    await this.idx.addApiKey({apikey: val});
    this.savedFlag = true;
  }

  navigateFunc(): void {
    this.route.navigate(['/']);
  }

  async deleteApiKey(): Promise<void> {
    this.inputVal = '';
    this.savedFlag = false;
    await this.idx.deleteApiKey();
  }


}
