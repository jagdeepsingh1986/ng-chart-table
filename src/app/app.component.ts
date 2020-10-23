import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './shared/dummy-data/dummy-data.service';
import * as _theme from './shared/chart-and-table/themes/simple';
import { StyledDataset } from './shared/model';
import * as _ from 'lodash';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
// TODO: Remove commented this code once code review completed and finalized.
export class AppComponent implements OnInit {

   public chartTheme = _theme.DEFAULT_THEME;
   public rowData = [];
   public columnDefs = [];
   public dataset: StyledDataset[] = [];
   
   // public chartType = GRAPH_TYPE.AREA_SPLINE;
   // public series = [];
   // public xAxisCategories = [];
   // public removeChartFields = ['guid', 'date', 'value', 'markup', 'wsp'];// ,'value','markup','wsp','incl','excl'


   constructor(private readonly dataService: DummyDataService) { }

   public ngOnInit() {
      //TODO:
      //this.tableColumnDefs();
      // this.chartConfig();
      this.setGraphData();

   }
   private setGraphData() {
      _.each(this.dataService.dataModel, (item, index) => {
         this.dataset.push(this.createStyleDataset(item));
      });
   }

   /**
    * 
    * @param item 
    */
   private createStyleDataset(item): StyledDataset {
      const sData = new StyledDataset();
      sData.label = item.label;
      sData.isActive = item.isActive;
      sData.graphType = item.graphType;
      sData.absoluteData = item.absoluteData;
      sData.data = item.data;
      sData.categories = item.categories;
      sData.lineTension = item.lineTension;
      sData.fill = item.fill;
      sData.backgroundColor = item.backgroundColor;
      sData.borderColor = item.borderColor;
      sData.pointBorderColor = item.pointBorderColor;
      sData.pointBackgroundColor = item.pointBackgroundColor;
      sData.spanGaps = item.spanGaps;
      return sData;
   }

   /**
    * Chart Settings and Configuration
    */
   // private chartConfig() {
   //    this.addSeriesName();
   //    this.dataService.getDummyData().map(item => {
   //       for (var key in item) {
   //          this.series.map(ser => {
   //             if (ser.name.toLowerCase() === key)
   //                ser.data.push(item[key]);
   //          });
   //       }
   //       this.xAxisCategories.push(item.date);
   //       this.rowData.push(item);
   //    });
   // }

   /**
    * Add Chart Series Name 
    */
   // private addSeriesName() {

   //    const item = this.dataService.getDummyData().length > 0 ? this.dataService.getDummyData()[0] : [];
   //    for (var key in item) {
   //       const isFieldHide = this.removeChartFields.find(x => x.toLowerCase() == key.toLowerCase());
   //       if (!isFieldHide) {
   //          const existKey = this.series.find(x => x.name === key);
   //          if (!existKey) {
   //             const data = { name: key.toUpperCase(), yAxis: 0, data: [] };
   //             this.series.push(data);
   //          }
   //       }
   //    };
   // }

   /**
    *  Table Columns Configuration
    */
   private tableColumnDefs() {
      this.columnDefs = [
         {
            headerName: '',
            children: [
               { headerName: 'DATE', field: 'date' }
            ]
         },
         {
            headerName: 'Sales',
            children: [
               { headerName: 'SQ', field: 'sq' },
               { headerName: 'EXCL', field: 'excl' },
               { headerName: 'INCL', field: 'incl' },
               { headerName: 'WSP', field: 'wsp' },
            ]
         },
         {
            headerName: 'Margin',
            children: [
               { headerName: 'MARKUP', field: 'markup' },
               { headerName: 'VALUE', field: 'value' }
            ]
         },
         {
            headerName: 'Inventory',
            children: [
               { headerName: 'WSP', field: 'wsp' },
               { headerName: 'MARKUP', field: 'markup' },
               { headerName: 'VALUE', field: 'value' }
            ]
         }

      ]
   }
}
