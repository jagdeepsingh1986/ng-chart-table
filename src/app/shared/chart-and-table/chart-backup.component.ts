import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import _sortBy from 'lodash-es/sortBy';
import * as _ from 'lodash';
import chroma from 'chroma-js';
import * as moment from 'moment';
import { GRAPH_COLUMN_NAME } from '../constants/graphConstants';
import { DAY_DATE_FORMAT, DATE_FORMAT } from '../constants/siteConstants';
import { formatNumber } from '../common-utils/common-utils';

@Component({
  selector: 'app-chart-and-table-bkp',
  templateUrl: './chart-and-table.component.html',
  styleUrls: ['./chart-and-table.component.scss']
})
export class ChartAndTableComponentBKP implements OnInit {

  @Input() setChartTheme: any = [];
  @Input() chartType: string = 'spline';
  @Input() chartTitle: string = null;
  @Input() chartSubTitle: string = null;
  @Input() xAxisCategories: Array<string> = [];
  @Input() chartSeries: Array<object> = [];
  @Input() columnDefs: Array<object> = [];
  @Input() tableData: Array<object> = [];

  public Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts
  public chartOptions: object = {}
  private yAxisConfig: any = [];

  // TODO:
  private graphMeta = {};
  private selectorGroups = [];
  private selectors = [];
  private config = {};

  private GRAPH_SERIE_OPTIONS_DEFAULT = {
    connectNulls: true
  };

  private GRAPH_XAXIS_OPTIONS_DEFAULT = {
    title: {
      text: null
    }
  };

  private GRAPH_YAXIS_OPTIONS_DEFAULT = {
    title: {
      text: null
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.setYAxis();
    this.chartInit();
  }

  private initialize() {

  }

  private chartInit() {
    this.Highcharts.setOptions(this.setChartTheme);
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

  private setChartConfig(reportItemsData, selectors, reportItemsConfig, stacked = false, stackedBy = []) {
    this.config = null;
    // TODO: z BE
    let formatter = null;
    // if (this.props.selectedReport === 'dashboard_1') {
    //   formatter = Chart.formatterComparison;
    // } else {
    //   formatter = Chart.formatter;
    // }
    let chartConfig = _.cloneDeep(this.getConfig(formatter));
    let chartSeries = this.getChartSeries(reportItemsData, selectors, false, stacked, stackedBy);
    if (reportItemsConfig) {
      chartConfig = _.merge({}, chartConfig, reportItemsConfig);
    }
    chartConfig.series = chartSeries;
    chartConfig.xAxis = this.getChartXAxis(chartSeries, reportItemsData, stacked, stackedBy);
    chartConfig.yAxis = this.getChartYAxis(chartSeries, reportItemsData, stacked, stackedBy);
    this.config = chartConfig;
  }

  private getChartSeries(reportItemsData, selectors, all = false, stacked = false, stackedBy = []) {
    let itemsData = _.cloneDeep(reportItemsData);
    let graphSeries = [];
    if (stacked) {
      const itemData = itemsData[0];
      _.each(itemData, item => {
        const stackedSerieName = item[GRAPH_COLUMN_NAME];
        const stackedSerieColor = item['graphColor'] || null;
        const stackedSerieData = [];
        _.each(stackedBy, stackedByKey => {
          stackedSerieData.push(item[stackedByKey] || null);
        });
        let serie = Object.assign(
          {},
          {
            name: stackedSerieName,
            data: stackedSerieData,
            color: stackedSerieColor,
            suffix: selectors.length ? selectors[0].suffix : null
          },
          this.GRAPH_SERIE_OPTIONS_DEFAULT
        );
        graphSeries.push(serie);
      });
    } else {
      let seriesSelectors = [];
      let yAxisGroups = [];
      if (all) {
        seriesSelectors = _.map(this.selectors, _.property('key'));
      } else {
        _.each(this.selectors, selector => {
          if (selector.isActive === true) {
            seriesSelectors.push(selector);
          }
        });
      }
      _.each(seriesSelectors, seriesSelector => {
        let seriesSelectorKey = seriesSelector.key;
        let group = this.getSelectorGroup(seriesSelectorKey);
        let xAxis = 0;
        let yAxis = 0;
        let yAxisGroup = _.findIndex(yAxisGroups, groupId => {
          return groupId === group.id;
        });
        if (yAxisGroup !== -1) {
          yAxis = yAxisGroup;
        } else {
          yAxisGroups.push(group.id);
          yAxis = yAxisGroups.length - 1;
        }
        _.each(itemsData, itemData => {
          let sConfig = {
            serieData: [],
            label: this.getGraphSelectorLabel(seriesSelectorKey),
            color: this.getSeriesColor(xAxis),
            tooltip: this.getPrimeTooltip(xAxis, seriesSelectorKey),
            type: this.getSeriesType(xAxis),
            index: this.getSeriesIndex(xAxis),
            isSerieColor: true,
          };

          if (_.isEmpty(sConfig.color)) {
            sConfig.isSerieColor = false;
            sConfig.color = this.getSelectorColor(seriesSelectorKey);
          }

          let insideSerieData = [];
          let multipleData = {};

          _.each(itemData, item => {

            if (item[seriesSelectorKey] !== null) {
              let value = item[seriesSelectorKey];
              if (_.isObject(value)) {

                _.each(value, (value, key) => {
                  if (_.isEmpty(multipleData[key])) {
                    multipleData[key] = [];
                  }
                  multipleData[key].push(value);
                });
              } else {
                if (_.isArray(value)) {
                  insideSerieData.push(...value);
                } else {
                  if (_.isFinite(value)) {
                    value = formatNumber(value, '', '0.[00]') * 1;
                  }
                  insideSerieData.push(value);
                }
              }
            } else {
              insideSerieData.push(null);
              // serieData.push(null);
            }
          });

          if (!_.isEmpty(insideSerieData)) {
            let config = _.cloneDeep(sConfig);
            let s = this.prepareSerie(insideSerieData, seriesSelector, xAxis, yAxis, config);
            graphSeries.push(s);
          }

          if (!_.isEmpty(multipleData)) {
            let iteration = 1;
            _.each(multipleData, (mData, key, i) => {
              let config = _.cloneDeep(sConfig);
              config.tooltip += ' ' + key;
              config.color = chroma(config.color)
                .darken(iteration)
                .hex();
              let s = this.prepareSerie(Object.values(mData), seriesSelector, xAxis, yAxis, config);
              graphSeries.push(s);
              iteration++;
            });
          }

          xAxis++;
        });
      });
    }

    return graphSeries;
  }
  private getConfig(formatter = null) {
    return {
      chart: {
        type: 'column',
        zoomType: 'x',
        spacingTop: 20
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          fillOpacity: 0.2
        }
      },
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
        formatter: formatter
      },
      xAxis: {},
      yAxis: [],
      series: []
    };
  }
  private getChartXAxis(chartSeries, reportItemsData, stacked = false, stackedBy = []) {
    let itemsData = _.cloneDeep(reportItemsData);
    let chartXAxis;
    if (stacked) {
      chartXAxis = {
        categories: []
      };
      _.each(stackedBy, stackedByKey => {
        chartXAxis.categories.push(stackedByKey);
      });
    } else {
      chartXAxis = [];
      _.each(chartSeries, (series, i) => {
        let seriesXAxis = series.xAxis;
        let seriesData = series.data;
        let categories = [];
        let plotBands = [];
        let weekdays = [];
        _.each(seriesData, (value, j) => {
          let item = itemsData[seriesXAxis][j];
          if (item[GRAPH_COLUMN_NAME]) {
            let value = item[GRAPH_COLUMN_NAME];
            let date = moment(value, DATE_FORMAT, true);
            if (date.isValid()) {
              let isWeekday = [0, 6].indexOf(date.toDate().getDay()) !== -1;
              if (isWeekday) {
                weekdays.push({ date: date.toDate(), index: j });
              }
              categories.push(date.format(DAY_DATE_FORMAT));
            } else {
              categories.push(value);
            }
          } else {
            categories.push(null);
          }
        });
        let xAxisItem = Object.assign({}, this.GRAPH_XAXIS_OPTIONS_DEFAULT, {
          categories
        });
        if (weekdays.length > 0) {
          _.each(weekdays, dayObj => {
            const index = dayObj.index;
            let from = index > 0.5 ? index - 0.5 : index;
            let to = index + 0.5;
            plotBands.push({
              from: from,
              to: to,
              color: '#f5f5f5'
            });
          });
        }
        xAxisItem = Object.assign({}, xAxisItem, {
          plotBands
        });
        if (seriesXAxis > 0) {
          //xAxisItem.visible = false;
          xAxisItem['visible'] = false;
        }
        chartXAxis.push(xAxisItem);
      });
    }
    return chartXAxis;
  }
  private getChartYAxis(chartSeries, reportItemsData, stacked = false, stackedBy = []) {
    let chartYAxis;
    if (stacked) {
      chartYAxis = {
        title: {
          enabled: true,
          text: '0..100'
        }
      };
    } else {
      chartYAxis = [];
      let yAxisGroups = [];
      _.each(chartSeries, (series, i) => {
        let seriesYAxis = series.yAxis;
        let seriesColor = series.color;
        let yAxisGroup = _.find(yAxisGroups, group => {
          return group.yAxis === seriesYAxis;
        });
        if (!yAxisGroup) {
          yAxisGroups.push({
            yAxis: seriesYAxis,
            color: seriesColor
          });
        }
      });
      _.each(yAxisGroups, yAxisGroup => {
        let yAxisItem = Object.assign({}, this.GRAPH_YAXIS_OPTIONS_DEFAULT, {
          labels: {
            style: {
              color: yAxisGroup.color
            }
          }
        });
        chartYAxis.push(yAxisItem);
      });
    }

    return chartYAxis;
  }
  private getGraphSelectorLabel(key) {
    let label = '';
    _.each(this.selectors, selector => {
      if (key === selector.key) {
        label = selector.name;
      }
    });
    return label;
  }
  private getSeriesColor(xAxis) {
    if (this.graphMeta && this.graphMeta[xAxis]) {
      let xAxisGraphMeta = _.cloneDeep(this.graphMeta[xAxis]);
      if (xAxisGraphMeta.graphColor) {
        if (typeof xAxisGraphMeta.opacity !== 'undefined') {
          return chroma(xAxisGraphMeta.graphColor)
            .alpha(xAxisGraphMeta.opacity)
            .css();
        }
        return xAxisGraphMeta.graphColor;
      }
      return null;
    }
    return null;
  }
  private getSeriesType(xAxis) {
    let seriesType = null;
    if (this.graphMeta && this.graphMeta[xAxis]) {
      let xAxisGraphMeta = _.cloneDeep(this.graphMeta[xAxis]);
      if (xAxisGraphMeta.graphType) {
        seriesType = xAxisGraphMeta.graphType;
      }
    }
    return seriesType;
  }
  private getSeriesIndex(xAxis) {
    if (this.graphMeta && this.graphMeta[xAxis]) {
      let xAxisGraphMeta = _.cloneDeep(this.graphMeta[xAxis]);
      if (typeof xAxisGraphMeta.index !== 'undefined') {
        return xAxisGraphMeta.index;
      }
      return null;
    }
    return null;
  }
  private getSelectorColor(selectorKey) {
    let color = '#222'; // DEFAULT_GROUP_COLOR;
    _.each(this.selectorGroups, group => {
      let selectorIndex = _.findIndex(group.selectors, selector => {
        return selector === selectorKey;
      });
      if (selectorIndex !== -1 && group.colors[selectorIndex]) {
        color = group.colors[selectorIndex];
      }
    });
    return color;
  }
  private setSelectors(reportSelectors) {
    if (!_.isEmpty(reportSelectors)) {
      this.selectors = _.cloneDeep(reportSelectors);
    }
  }
  private getSelectorGroup(selectorKey) {
    return _.find(this.selectorGroups, group => {
      return _.indexOf(group.selectors, selectorKey) !== -1;
    });
  }
  private getChartPreviewStyle(selectorKey) {
    let color = this.getSelectorColor(selectorKey);
    return {
      line: {
        backgroundColor: color
      },
      name: {
        color: color
      }
    };
  }
  private getPrimeTooltip(xAxis, selector) {
    if (this.graphMeta && this.graphMeta[xAxis]) {
      let xAxisGraphMeta = _.cloneDeep(this.graphMeta[xAxis]);
      if (xAxisGraphMeta.graphTooltips) {
        let tooltips = _.cloneDeep(xAxisGraphMeta.graphTooltips);
        let tooltip = _.find(tooltips, (value, key) => {
          return selector === key;
        });
        return tooltip;
      }
      return null;
    }
    return null;
  }
  private prepareSerie(sData, seriesSelector, xAxis, yAxis, config) {
    let serie = Object.assign(
      {},
      {
        selector: seriesSelector.key,
        name: config.label,
        data: sData,
        tooltip: config.tooltip ? config.tooltip : config.label,
        xAxis: xAxis,
        yAxis: yAxis,
        color: config.color,
        suffix: seriesSelector.suffix
      },
      this.GRAPH_SERIE_OPTIONS_DEFAULT
    );
    if (xAxis > 0 && config.isSerieColor === false) {
      config.color = chroma(config.color)
        .brighten(xAxis)
        .hex();
      serie = Object.assign(serie, { color: config.color });
    }
    if (config.type) {
      serie = Object.assign(serie, { type: config.type });
    }
    if (config.index) {
      serie = Object.assign(serie, { index: config.index });
    }
    return serie;
  }


  // Demonstrate chart instance
  logChartInstance(chart: Highcharts.Chart) {
    console.log('Chart instance: ', chart);
  }
}
