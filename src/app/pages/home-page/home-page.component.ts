import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private UserService: UserService, private BitcoinService: BitcoinService) { }

  loggedinUser!: User | null;
  coinRate!: any;
  subscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.UserService.loadUser()
    // this.coinRate = await this.BitcoinService.getCoinRate()
    const coinRate = await lastValueFrom(this.BitcoinService.getCoinRate());
    if (coinRate) this.coinRate = coinRate
    this.subscription = this.UserService.user$.subscribe(user => {
      this.loggedinUser = user
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
