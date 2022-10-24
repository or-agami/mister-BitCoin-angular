import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mister-BitCoin-angular';

  // currPage: string = 'home'
  currPage: string = 'contact'

  onChangePage(to: string): void {
    this.currPage = to
  }
}
