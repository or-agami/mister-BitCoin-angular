import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  constructor(private UserService: UserService, private BitcoinService: BitcoinService) { }
  
  user!: User;
  coinRate!: any;

  async ngOnInit(): Promise<void> {
    this.user = this.UserService.getUser()
    // this.coinRate = await this.BitcoinService.getCoinRate()
    const coinRate = await lastValueFrom(this.BitcoinService.getCoinRate());
    if (coinRate) this.coinRate = coinRate
    console.log('this.coinRate:', this.coinRate)
  }
}
