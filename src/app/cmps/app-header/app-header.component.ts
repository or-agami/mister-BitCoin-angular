import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  constructor() { }

  @Input() currPage!: string
  @Output() changePage = new EventEmitter<string>()

  ngOnInit(): void {
  }

}
