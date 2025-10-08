import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';
import { TitleComponent } from './core/components/title/title.component';
import { CardComponent } from './core/components/card/card.component';
import { ChartComponent } from './core/components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ChartLineComponent } from './core/components/chart-line/chart-line.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    NotFoundComponent, 
    DetailsComponent,
    TitleComponent,
    CardComponent,
    ChartComponent,
    ChartLineComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
