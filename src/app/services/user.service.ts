import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Move } from '../models/move.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //mock the server
  private _userDB: User | null = this._loadFromStorage();

  private _user$ = new BehaviorSubject<User | null>(this._userDB)
  public user$ = this._user$.asObservable()

  constructor() {
  }

  loadUser() {
    this._user$.next(this._loadFromStorage())
    return this._userDB
  }

  login(name: string) {
    const user = new User(name);
    this._saveToStorage(user)
    this._user$.next(user)
  }

  logout() {
    localStorage.removeItem('user')
    this._user$.next(null)
  }

  makeTransaction(amount: number, to: string) {
    const user = this._loadFromStorage()
    if (!user) return
    const move = new Move(amount, to)
    user.coins -= amount
    user.moves.unshift(move)
    this._saveToStorage(user)
    this._user$.next(user)
  }

  private _saveToStorage(user: User): void {
    const str = JSON.stringify(user)
    localStorage.setItem('user', str)
  }

  private _loadFromStorage(): User | null {
    const str = localStorage.getItem('user')
    return (str) ? JSON.parse(str) : null
  }
}