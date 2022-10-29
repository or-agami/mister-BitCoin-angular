import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  constructor(
    private UserService: UserService,
  ) { }

  @Input() currPage!: string

  loggedinUser!: User | null
  subscription!: Subscription
  isLoginModalOpen: boolean = false

  ngOnInit(): void {
    this.UserService.loadUser()
    this.subscription = this.UserService.user$.subscribe(user => {
      this.loggedinUser = user
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toggleLogin(): void {
    if (this.loggedinUser) this.UserService.logout()
    else this.isLoginModalOpen = !this.isLoginModalOpen
  }
}
