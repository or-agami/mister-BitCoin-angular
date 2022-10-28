import { BitcoinService } from './../../services/bitcoin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  constructor(private BitcoinService: BitcoinService) { }

  chartData!: [{ x: number, y: number }]
  chartX: Array<string> = []
  chartY: Array<number> = []

  ngOnInit(): void {
    this.BitcoinService.getMarketPriceHistory().subscribe(values => values.forEach(data => {
      this.chartX.push(new Date(data.x * 1000).toLocaleDateString())
      this.chartY.push(data.y)
    }))
  }

}
