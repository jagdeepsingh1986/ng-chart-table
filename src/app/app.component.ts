import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './shared/dummy-data/dummy-data.service';
import * as _theme from './shared/chart-and-table/themes/simple';
import { GRAPH_TYPE } from './shared/enums/app-enums';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   public chartTheme = _theme.DEFAULT_THEME;
   public chartType = GRAPH_TYPE.AREA_SPLINE;
   public series = [];
   public xAxisCategories = [];
   public rowData = [];
   public columnDefs = [];
   public removeChartFields = ['guid', 'date', 'value', 'markup', 'wsp'];// ,'value','markup','wsp','incl','excl'

   constructor(private readonly dataService: DummyDataService) { }

   public ngOnInit() {
      this.tableColumnDefs();
      this.chartConfig();
   }

   /**
    * Chart Settings and Configuration
    */
   private chartConfig() {
      this.addSeriesName();
      this.dataService.getDummyData().map(item => {
         for (var key in item) {
            this.series.map(ser => {
               if (ser.name.toLowerCase() === key)
                  ser.data.push(item[key]);
            });
         }
         this.xAxisCategories.push(item.date);
         this.rowData.push(item);
      });
   }

   /**
    * Add Chart Series Name 
    */
   private addSeriesName() {

      const item = this.dataService.getDummyData().length > 0 ? this.dataService.getDummyData()[0] : [];
      for (var key in item) {
         const isFieldHide = this.removeChartFields.find(x => x.toLowerCase() == key.toLowerCase());
         if (!isFieldHide) {
            const existKey = this.series.find(x => x.name === key);
            if (!existKey) {
               const data = { name: key.toUpperCase(), yAxis: 0, data: [] };
               this.series.push(data);
            }
         }
      };
   }

   /**
    *  Table Columns Configuration
    */
   private tableColumnDefs() {
      this.columnDefs = [
         { headerName: 'DATE', field: 'date', sortable: true, filter: true },
         { headerName: 'SQ', field: 'sq', sortable: true, filter: true },
         { headerName: 'EXCL', field: 'excl', sortable: true, filter: true },
         { headerName: 'INCL', field: 'incl', sortable: true, filter: true },
         { headerName: 'WSP', field: 'wsp', sortable: true, filter: true },
         { headerName: 'MARKUP', field: 'markup', sortable: true, filter: true },
         { headerName: 'VALUE', field: 'value', sortable: true, filter: true },
      ]
   }
}
