import { IndexedDbService } from './service/indexed-db.service';
import { HttpService } from './service/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountrylistComponent } from './page/countrylist/countrylist.component';
import { ApikeyComponent } from './page/apikey/apikey.component';
import { NewsDetailComponent } from './page/news-detail/news-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CountrylistComponent,
    ApikeyComponent,
    NewsDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    HttpService,
    IndexedDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
