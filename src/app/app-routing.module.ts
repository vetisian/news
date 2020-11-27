import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApikeyComponent } from './page/apikey/apikey.component';
import { CountrylistComponent } from './page/countrylist/countrylist.component';
import { NewsDetailComponent } from './page/news-detail/news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CountrylistComponent
  },
  {
    path: 'news/:cname/:cid',
    component: NewsDetailComponent
  },
  {
    path: 'apikey',
    component: ApikeyComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
