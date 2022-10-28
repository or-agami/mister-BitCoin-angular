import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }


  public getCoinRate() {
    return this.http.get<{ USD: { last: number } }>('https://blockchain.info/ticker')
      .pipe(
        map(res => res['USD'].last)
      )
  }

  public getMarketPriceHistory() {
    return this.http.get<{ values: [{ x: number, y: number }] }>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
      .pipe(
        tap(res => console.log(res.values)),
        map(res => {
          return res.values
        })
      )
  }

}
