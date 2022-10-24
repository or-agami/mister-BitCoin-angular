import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  
  public shouldAdoptPet() {
    return this.http.get<{ answer: any }>('https://yesno.wtf/api')
        .pipe(
            map(res => res.answer)
        )
}

}
