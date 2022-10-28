import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  @Input() chartX!: Array<string>
  @Input() chartY!: Array<number>

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("line", {
      type: 'line',

      data: {
        labels: this.chartX,
        datasets: [
          {
            label: "Rates",
            data: this.chartY,
            borderColor: 'white',
            pointBackgroundColor: '#f1811d',
            backgroundColor: '#f18a1d',
            fill: true,
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

}