import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartAndTableComponent } from './shared/chart-and-table/chart-and-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { DummyDataService } from './shared/dummy-data/dummy-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartAndTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    AgGridModule.withComponents([])
  ],
  exports:[],
  providers: [DummyDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
