import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import _sortBy from 'lodash-es/sortBy';
import * as _ from 'lodash';
import { GRAPH_TYPE } from '../../shared/enums/app-enums';
import * as moment from 'moment';
import { DATE_FORMAT } from '../constants/siteConstants';
import { isWeekday } from '../common-utils/common-utils';

@Component({
  selector: 'app-chart-and-table',
  templateUrl: './chart-and-table.component.html',
  styleUrls: ['./chart-and-table.component.scss']
})
export class ChartAndTableComponent implements OnInit {

  @Input() setChartTheme: any = [];
  @Input() chartType: GRAPH_TYPE = GRAPH_TYPE.SPLINE;
  @Input() chartTitle: string = null;
  @Input() chartSubTitle: string = null;
  @Input() xAxisCategories: Array<string> = [];
  @Input() chartSeries: Array<object> = [];
  @Input() columnDefs: Array<object> = [];
  @Input() tableData: Array<object> = [];
  @Input() defaultColDef: object = {};

  public Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts
  public chartOptions: object = {}
  private yAxisConfig: any = [];
  private xAxisPlotBands = [];

  // table variables
  private gridApi;
  private gridColumnApi;

  // TODO:
  private graphMeta = {};
  private selectorGroups = [];
  private selectors = [];
  private config = {};


  constructor() { }

  ngOnInit(): void {

    this.chartInit();
    this.tableInit();
  }

  // TODO:
  private initialize() {

  }

  /**
   * 
   */
  private tableInit() {
    this.defaultColDef = {
      width: 170,
      resizable: false,
      suppressSizeToFit: false,
      unSortIcon: false,
      sortable: true
    }
  }

  /**
   * 
   * @param params 
   */
  public getRowStyle(params) { }

  /**
   * 
   * @param params 
   */
  public getTableRowClass(params) {
    return isWeekday(params.data.date) ? '-is-weekday' : '';
  }

  /**
   * 
   */
  private chartInit() {
    this.Highcharts.setOptions(this.setChartTheme);
    this.setYAxis();
    this.setChartPlotsColor();
    this.chartOptions = {
      chart: {
        type: this.chartType,
        zoomType: 'x',
        spacingTop: 20,
        width: 1800,
      },
      title: {
        text: this.chartTitle
      },
      subtitle: {
        text: this.chartSubTitle
      },
      xAxis: {
        categories: this.xAxisCategories,
        plotBands: this.xAxisPlotBands
      },
      yAxis: this.yAxisConfig,
      tooltip: {
        crosshairs: [true],
        animation: true,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 4,
        borderWidth: 1,
        shared: true,
        shadow: true,
        padding: 20,
        style: {
          color: '#666',
          lineHeight: 20
        },
      },
      legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
        itemMarginTop: 0,
        itemMarginBottom: 10
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.09,
        },
        series: {
          fillOpacity: 0.2
        }
      },
      series: this.chartSeries
    };
  }

  /**
   * 
   */
  private setYAxis() {
    const count = this.chartSeries.length;
    if (count > 0) {
      this.chartSeries.map((row, i) => {
        const index = ((count - 1) - i);
        const obj = {
          title: {
            text: '',
            style: {
              color: Highcharts.getOptions().colors[index]
            }
          },
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[index]
            }
          }
        };
        this.yAxisConfig.push(obj);
        row['yAxis'] = index;
      });



    }
  }

  /**
   * 
   */
  private setChartPlotsColor() {
    _.each(this.xAxisCategories, (dayObj, index) => {
      if (isWeekday(dayObj)) {
        const from = index > 0.5 ? index - 0.5 : index;
        const to = index + 0.5;
        const plotBands = {
          from: from,
          to: to,
          color: '#f5f5f5'
        };
        this.xAxisPlotBands.push(plotBands);
      }
    });
  }

  /**
   * 
   * @param params 
   */
  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    //const style = this.gridApi.getRowClass();
    //console.log('Style: ', style);
  }

  /**
   * 
   * @param params 
   */
  public onFirstDataRendered(params) {  }
  // Demonstrate chart instance
  logChartInstance(chart: Highcharts.Chart) {
    console.log('Chart instance: ', chart);
  }

}
