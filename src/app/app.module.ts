import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AppFooterComponent } from './cmps/app-footer/app-footer.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactDetailsComponent } from './cmps/contact-details/contact-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './cmps/line-chart/line-chart.component';
import { LoginComponent } from './cmps/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AppHeaderComponent,
    AppFooterComponent,
    ContactPageComponent,
    StatsPageComponent,
    ContactPreviewComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    LineChartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
