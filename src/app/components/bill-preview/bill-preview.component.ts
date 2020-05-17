import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/models/bill-common-model';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.css']
})
export class BillPreviewComponent implements OnInit {
  public billData: Bill;
  constructor(private billService: BillService) {
    this.billData = new Bill();
  }

  ngOnInit() {
    this.billData = this.billService.getBillData();
  }

}
