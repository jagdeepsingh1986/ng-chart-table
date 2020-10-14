import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationRatingInTime, ChartType, RatingInTime, RatingsDataSourceType, RatingsInTimeChart } from '../../../model/model';
import { AppService } from '../../../service/app.service';
import { NotificationService } from '../../../service/notification.service';
import { GenericChartComponent, StyledDataset } from '../generic-chart/generic-chart.component';

class CsvData {
  app: string;
  date: string;
  value: number;
}

@Component({
  selector: 'app-period-chart',
  templateUrl: '../generic-chart/generic-chart.component.html',
  styleUrls: ['../../../app.component.less']
})
export class PeriodChartComponent extends GenericChartComponent
  implements OnChanges {
  @Input() componentId = 'periodChartId';

  csvDataList: CsvData[] = [];
  data: RatingsInTimeChart;
  internalLabels: string[] = [];

  originValues = [];
  colorMap = {};
  legendMap = {};

  constructor(
    protected appService: AppService,
    protected notificationService: NotificationService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    super(appService, notificationService, router, route);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isChartReady = false;
    this.prepareData();
    this.isChartReady = true;
  }

  private prepareData() {
    if (!this.isDashboard) {
      this.notificationService.setLoading(true);
    }
    this.appService.getRatingsInTime(this.filter)
      .subscribe(result => {
        this.data = result;

        this.aggregation =
          this.filter.dataSourceType === RatingsDataSourceType.RATINGS
            ? 'day'
            : 'week';

        if (this.filter.aggregation) {
          this.aggregation = this.filter.aggregation;
        }

        ({
          private: this.internalLabels,
          public: this.labels
        } = this._getDayLabels(this.filter.dateFrom, this.filter.dateTo, this.aggregation));

        this.styledDatasets = this.createDataSets();
        this.csvDataList = this.createDataForCsv(this.data.ratings);
        this.initChart();
      })
      .add(() => this.notificationService.setLoading(false));
  }

  private createDataForCsv(ratings: ApplicationRatingInTime[]) {
    const csvDataList: CsvData[] = [];
    for (const rating of ratings) {
      for (const appRating of rating.ratings) {
        const csvObject = new CsvData();
        csvObject.app = rating.app.label;
        csvObject.date = formatDate(appRating.date, 'dd.MM.yyyy', 'cs');
        if (ChartType.RATING_IN_TIME === this.filter.chartType) {
          csvObject.value = appRating.avg;
        } else {
          csvObject.value = appRating.nps;
        }
        csvDataList.push(csvObject);
      }
    }
    return csvDataList;
  }

  private createDataSets() {
    const styledDatasets: StyledDataset[] = [];

    this.originValues = [];
    this.lastValue = [];

    for (const rating of this.data.ratings) {
      this.originValues.push(rating.app.label);
      styledDatasets.push(
        this.createDataSet(
          rating.app.label,
          rating.ratings,
          this.data.ratings.indexOf(rating)
        )
      );
    }

    return styledDatasets;
  }

  private createDataSet(label: string, ratings: RatingInTime[], index: number) {
    const dataset = new StyledDataset();
    dataset.label = label;

    dataset.setBankColor(this.bankColorMap, this.bankBackgroundColorMap, label, index);

    this.colorMap[dataset.label] = dataset.backgroundColor;
    this.legendMap[dataset.label] = dataset.label;

    const ratingsMap = {};
    const ratingInTimeMap = {};
    let closestString;

    for (const ratingInTime of ratings) {
      closestString = this._getNextAggregatedDateString(ratingInTime);

      if (!ratingInTimeMap.hasOwnProperty(closestString)) {
        ratingInTimeMap[closestString] = {
          date: closestString,
          stars1: undefined,
          stars2: undefined,
          stars3: undefined,
          stars4: undefined,
          stars5: undefined,
          all_stars: undefined
        };
      }

      if (ratingInTime['stars1']) {
        if (!ratingInTimeMap[closestString]['stars1']) {
          ratingInTimeMap[closestString]['stars1'] = 0;
          ratingInTimeMap[closestString]['stars2'] = 0;
          ratingInTimeMap[closestString]['stars3'] = 0;
          ratingInTimeMap[closestString]['stars4'] = 0;
          ratingInTimeMap[closestString]['stars5'] = 0;
          ratingInTimeMap[closestString]['all_stars'] = 0;
        }

        // @assert they are defined none/all
        ratingInTimeMap[closestString]['stars1'] += ratingInTime['stars1'];
        ratingInTimeMap[closestString]['stars2'] += ratingInTime['stars2'];
        ratingInTimeMap[closestString]['stars3'] += ratingInTime['stars3'];
        ratingInTimeMap[closestString]['stars4'] += ratingInTime['stars4'];
        ratingInTimeMap[closestString]['stars5'] += ratingInTime['stars5'];
        ratingInTimeMap[closestString]['all_stars'] +=
          ratingInTime['stars1'] +
          ratingInTime['stars2'] +
          ratingInTime['stars3'] +
          ratingInTime['stars4'] +
          ratingInTime['stars5'];
      }
    }

    // @note: should it be method of dataset (?); we are changing dataset inside !!
    this._updateDataset(dataset, ratingInTimeMap, 'stars1', record => {
      let value;

      if (ChartType.NPS === this.filter.chartType) {
        value =
          (100 * (record['stars5'] - record['stars1'] - record['stars2'])) /
          record['all_stars'];
      } else {
        value =
          (5 * record['stars5'] +
            4 * record['stars4'] +
            3 * record['stars3'] +
            2 * record['stars2'] +
            1 * record['stars1']) /
          record['all_stars'];
      }

      if (!(value === undefined)) {
        this.lastValue[index] =
          this.lastValue[index] === undefined ? 0 : this.lastValue[index];
        this.lastValue[index] = value;
      }

      return value;
    });

    // fill chart only when it is dashboard;
    if (this.isDashboard) {
      dataset.fill = 'origin';
    }

    return dataset;
  }

  public initChart() {
    const chartOptions = {
      legend: {
        display: this.showLegend && this.isDashboard,
        position: 'bottom',
        labels: {
          fontColor: '#455A64',
          fontSize: 14
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              precision: 2
            },
            scaleLabel: {
              display: true,
              labelString:
                this.filter.chartType === ChartType.NPS ? 'NPS' : 'Hodnocení'
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              maxTicksLimit: 20
            }
          }
        ]
      },
      tooltips: {
        displayColors: false,
        backgroundColor: '#455A64',
        bodyFontColor: '#ECEFF1',
        bodyFontSize: 14,
        cornerRadius: 2,
        caretSize: 0,
        callbacks: {
          title: function (tooltipItems, data) {
            return data.datasets[tooltipItems[0].datasetIndex].label;
          },
          label: function (tooltipItem, data) {
            return Math.round(tooltipItem.yLabel * 100) / 100;
          }
        }
      }
    };

    this.prepareChart('line', chartOptions);
  }
}
