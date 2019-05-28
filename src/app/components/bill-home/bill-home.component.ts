import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-home',
  templateUrl: './bill-home.component.html',
  styleUrls: ['./bill-home.component.css']
})
export class BillHomeComponent implements OnInit {
  public billers: Array<string> = ['Paul Offset', 'Paul Box'];
  public billTypes: Array<string> = ['Sell', 'Purchase'];
  constructor() { }

  ngOnInit() {
  }

}
