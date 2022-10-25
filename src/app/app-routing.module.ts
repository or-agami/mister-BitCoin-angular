import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './cmps/contact-details/contact-details.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';

const routes: Routes = [
  { path: 'stats', component: StatsPageComponent },
  {
    path: 'contact', component: ContactPageComponent, children: [
      { path: ':id', component: ContactDetailsComponent },
      // { path: 'edit', component: ContactEditComponent },
    ]
  },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
