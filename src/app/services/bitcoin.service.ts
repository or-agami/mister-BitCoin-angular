import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }


  public getCoinRate() {
    return this.http.get<{ USD: any }>('https://blockchain.info/ticker')
      .pipe(
        map(res => res['USD'].last)
      )
  }

}
