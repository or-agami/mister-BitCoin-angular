import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../models/user.model';



const USER = {
  name: "Ochoa Hyde",
  coins: 100,
  moves: []
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //mock the server
  private _userDB: User = USER;

  private _user$ = new BehaviorSubject<User>(this._userDB)
  public user$ = this._user$.asObservable()

  constructor() {
  }

  getUser() {
    return this._userDB
  } 
}