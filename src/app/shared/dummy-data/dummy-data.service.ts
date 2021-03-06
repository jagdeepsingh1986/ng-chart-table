import { Injectable } from '@angular/core';

@Injectable()
export class DummyDataService {

    private data = [
      {
      "guid": "79faae1d-1690-4042-ab78-5409316ef71c",
      "date": "10/3/2020",
      "sq": 398,
      "excl": 3936.62,
      "incl": 6606.39,
      "wsp": 6315.91,
      "markup": 6649.18,
      "value": 1482.66
      },
      {
      "guid": "5d3b5fa2-a2e2-4077-aa19-4b1f89203f79",
      "date": "10/10/2020",
      "sq": 6943.91,
      "excl": 880.88,
      "incl": 6116.38,
      "wsp": 4043.4,
      "markup": 4626.59,
      "value": 2620.97
      },
      {
      "guid": "da71c436-0ece-4eb8-8e29-b76485f756bb",
      "date": "10/2/2020",
      "sq": 6660.34,
      "excl": 3288.18,
      "incl": 5460.49,
      "wsp": 7312.89,
      "markup": 82.9,
      "value": 6350.77
      },
      {
      "guid": "c40440ec-5e3e-4065-ac90-a6e314ec7cf2",
      "date": "10/18/2020",
      "sq": 1878.63,
      "excl": 2890.32,
      "incl": 6198.74,
      "wsp": 6223.01,
      "markup": 2801.31,
      "value": 9385.2
      },
      {
      "guid": "6b6a16b8-7c8f-41d5-82d9-70d54112867b",
      "date": "10/11/2020",
      "sq": 9518.99,
      "excl": 7974.88,
      "incl": 7503.64,
      "wsp": 8978.21,
      "markup": 300.59,
      "value": 2013.58
      },
      {
      "guid": "64c7987b-1f44-4c31-b345-f31476ffe4c7",
      "date": "10/13/2020",
      "sq": 125.39,
      "excl": 6024.41,
      "incl": 4122.3,
      "wsp": 4227.65,
      "markup": 7997.46,
      "value": 8496.93
      },
      {
      "guid": "14ac0eb2-e0db-4856-98c8-3713b8be19f1",
      "date": "10/15/2020",
      "sq": 8540.52,
      "excl": 5858.86,
      "incl": 4625.36,
      "wsp": 1700.31,
      "markup": 6309.89,
      "value": 6499.39
      },
      {
      "guid": "15b987d8-b574-4e3c-9b9e-79d36aac0ea1",
      "date": "10/4/2020",
      "sq": 1837.97,
      "excl": 2909.27,
      "incl": 6135.12,
      "wsp": 1501.8,
      "markup": 6298.86,
      "value": 6299.6
      },
      {
      "guid": "c34d9dea-fc21-4789-a6e4-6423e1773487",
      "date": "10/15/2020",
      "sq": 2365.25,
      "excl": 1946.94,
      "incl": 2215.13,
      "wsp": 9166.52,
      "markup": 4241.39,
      "value": 1557.1
      },
      {
      "guid": "9e094340-ee47-4fa1-9647-691c5831447b",
      "date": "10/10/2020",
      "sq": 3515.88,
      "excl": 6242.58,
      "incl": 7552.2,
      "wsp": 7680.18,
      "markup": 7380.61,
      "value": 2703.95
      }
      ];

    constructor() { }
    public getDummyData() :any[]{
        return this.data;
    }
}