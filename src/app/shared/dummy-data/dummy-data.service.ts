import { Injectable } from '@angular/core';

@Injectable()
export class DummyDataService {

    private data = [
        {
          "guid": "1e5f98d7-0e33-4659-9ada-5b45996ec90c",
          "date": "04/16/2018",
          "sq": 88,
          "excl": 220,
          "incl": 409,
          "wsp": 700,
          "markup": 806,
          "value": 1498
        },
        {
          "guid": "ddeb94c2-9274-4405-a464-89446340e430",
          "date": "09/12/2014",
          "sq": 21,
          "excl": 376,
          "incl": 418,
          "wsp": 622,
          "markup": 973,
          "value": 1655
        },
        {
          "guid": "4f12bae3-ef0d-4fe3-8b2d-ac44c3bca4c2",
          "date": "09/01/2016",
          "sq": 34,
          "excl": 363,
          "incl": 505,
          "wsp": 664,
          "markup": 881,
          "value": 1367
        },
        {
          "guid": "81d3ec2e-c72e-4d74-ac1f-461b07d58ffc",
          "date": "04/23/2015",
          "sq": 65,
          "excl": 294,
          "incl": 480,
          "wsp": 619,
          "markup": 902,
          "value": 1503
        },
        {
          "guid": "eea23344-56f4-49de-8bac-81f3101d95f0",
          "date": "12/10/2019",
          "sq": 100,
          "excl": 219,
          "incl": 549,
          "wsp": 649,
          "markup": 949,
          "value": 1617
        },
        {
          "guid": "5aa7466e-61e3-48ce-91d2-0b40af9848dc",
          "date": "02/15/2020",
          "sq": 138,
          "excl": 226,
          "incl": 416,
          "wsp": 694,
          "markup": 981,
          "value": 1504
        },
        {
          "guid": "e47dedbd-0d8d-474c-a722-d79dea89ca23",
          "date": "12/06/2016",
          "sq": 141,
          "excl": 208,
          "incl": 442,
          "wsp": 791,
          "markup": 992,
          "value": 1132
        },
        {
          "guid": "9f5029c0-4bfe-40eb-9e29-9ad23fa18089",
          "date": "08/21/2019",
          "sq": 153,
          "excl": 390,
          "incl": 429,
          "wsp": 707,
          "markup": 837,
          "value": 1198
        },
        {
          "guid": "8251633f-c89b-40f2-bffd-d6da157ed415",
          "date": "10/08/2018",
          "sq": 82,
          "excl": 282,
          "incl": 420,
          "wsp": 643,
          "markup": 812,
          "value": 1569
        },
        {
          "guid": "13e20c7d-3923-41a3-9c37-38eee875ab9d",
          "date": "07/02/2020",
          "sq": 20,
          "excl": 259,
          "incl": 556,
          "wsp": 659,
          "markup": 940,
          "value": 1077
        },
        {
          "guid": "c4a62929-15f2-4748-8cf6-0208eeacf12d",
          "date": "01/19/2016",
          "sq": 156,
          "excl": 221,
          "incl": 412,
          "wsp": 693,
          "markup": 919,
          "value": 1088
        },
        {
          "guid": "06fe61bb-e7a9-4729-957b-9a7310358a57",
          "date": "07/07/2016",
          "sq": 104,
          "excl": 284,
          "incl": 579,
          "wsp": 640,
          "markup": 993,
          "value": 1083
        },
        {
          "guid": "9d63d1bc-21da-439a-afca-53f2234438dd",
          "date": "04/09/2017",
          "sq": 51,
          "excl": 337,
          "incl": 429,
          "wsp": 650,
          "markup": 921,
          "value": 1272
        },
        {
          "guid": "2cf9268a-8aa2-4370-bb59-9f1fc10ed3fb",
          "date": "11/01/2016",
          "sq": 45,
          "excl": 331,
          "incl": 530,
          "wsp": 757,
          "markup": 946,
          "value": 1494
        },
        {
          "guid": "02f3190f-adef-4574-9c28-babf50a57568",
          "date": "07/27/2016",
          "sq": 141,
          "excl": 284,
          "incl": 422,
          "wsp": 743,
          "markup": 938,
          "value": 1004
        },
        {
          "guid": "d9fdf384-1468-40cb-a9c1-97fd22a8da5d",
          "date": "06/19/2016",
          "sq": 120,
          "excl": 398,
          "incl": 516,
          "wsp": 695,
          "markup": 928,
          "value": 1737
        }
      ];

    constructor() { }
    public getDummyData() :any[]{
        return this.data;
    }
}