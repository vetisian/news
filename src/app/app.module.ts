import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountrylistComponent } from './page/countrylist/countrylist.component';
import { ApikeyComponent } from './page/apikey/apikey.component';
import { NewsDetailComponent } from './page/news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CountrylistComponent,
    ApikeyComponent,
    NewsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
