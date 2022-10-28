import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private UserService: UserService,
  ) { }
  @Output() toggleLogin = new EventEmitter()

  username: string = ''

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  onLogin() {
    this.toggleLogin.emit()
    this.UserService.login(this.username)
  }
}
