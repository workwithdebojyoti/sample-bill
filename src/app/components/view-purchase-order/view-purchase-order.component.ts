import { Component, OnInit } from '@angular/core';
import { PurchaseOrder, MonthModel, PaymentInfo, TransactionType, Organisation, Tabs, FileType } from 'src/app/models/bill-common-model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css']
})
export class ViewPurchaseOrderComponent implements OnInit {
  public purchaseOrders: Array<PurchaseOrder> = [];
  public months: Array<MonthModel> = [];
  public buyers: Array<string>;
  public selectedMonth: string;
  public selectedBuyer: string;
  public monthlyOrderTotal: number;
  public monthlyGSTTotal: number;
  public seriesData: number[];
  public categories: string[];
  public fileName: string;
  currentYear: number;
  public selectedPurchaseItem: PurchaseOrder;
  monthControl = new FormControl('', [Validators.required]);
  yearControl = new FormControl('', [Validators.required]);
  buyerControl = new FormControl('', [Validators.required]);
  paymentInfo: any;
  constructor(private purchaseOrderService: PurchaseOrderService, private commonService: CommonService,
              private route: Router, private billService: BillService, public dialog: MatDialog) {
    this.billService.setMonthList();
    this.months = this.billService.getMonthList();
    this.buyers =  [Organisation.PB, Organisation.PO];
    this.selectedBuyer = Organisation.PB;
    this.selectedMonth = this.months.find( x => x.monthValue === (new Date().getMonth() + 1)).monthName;
    this.fileName = Tabs.PurchaseTab + (new Date()).toLocaleString() + FileType.Exel;
  }
  ngOnInit() {
    this.fetchPurchaseOrder(0, 0, this.selectedBuyer);
    this.fetchPurchaseOrderSummary(0, 0, this.selectedBuyer);
    this.fetchLast3MonthsPurchaseTotal(this.selectedBuyer);
    this.last3Months();
    this.currentYear = new Date().getFullYear();
    this.yearControl.setValue(this.currentYear);
    this.monthControl.setValue(this.selectedMonth);
    this.buyerControl.setValue(this.selectedBuyer);
  }
  fetchPurchaseOrder(month: number, year: number, organisation: string): void {
    debugger;
    this.commonService.displayLoader(true);
    this.purchaseOrderService.fetchPurchaseOrder(month, year, organisation).subscribe( response => {
      this.commonService.displayLoader(false);
      this.purchaseOrders = response;
    }, (err) => {
      this.commonService.displayLoader(false);
      console.log('err', err);
    });
  }
  addPurchase(): void {
    this.route.navigateByUrl('/purchase');
  }
  displayPurchase(): void {
    this.fetchPurchaseOrder(+this.monthControl.value, this.yearControl.value, this.buyerControl.value);
    this.selectedMonth = this.months.find( x => x.monthValue === +(this.monthControl.value)).monthName;
    this.fetchPurchaseOrderSummary(+this.monthControl.value, this.yearControl.value, this.buyerControl.value);
    this.fetchLast3MonthsPurchaseTotal(this.buyerControl.value);
  }

  fetchPurchaseOrderSummary(month: number, year: number, organisation: string): void {
    this.purchaseOrderService.fetchPurchaseOrderMonthlySummary(month, year, organisation).subscribe( response => {
    this.monthlyOrderTotal = response[0];
    this.monthlyGSTTotal = response[1];
    }, (err) => {
      console.log(err);
    });
  }

  fetchLast3MonthsPurchaseTotal(organisation: string): void {
    this.purchaseOrderService.fetchLast3MonthsPurchaseTotal(organisation).subscribe( response => {
      this.seriesData = response;
    }, (err) => {
      console.log(err);
    });
  }
  last3Months(): void {
    let x = new Date();
    const currentMonth = x.getMonth() + 1 ;
    x = new Date(x.setMonth(x.getMonth() - 1));
    const lastMonth = x.getMonth() + 1 ;
    x = new Date(x.setMonth(x.getMonth() - 1));
    const secondLastMonth = x.getMonth() + 1 ;
    this.categories = [this.months.find( one => one.monthValue === currentMonth).monthName,
      this.months.find( two => two.monthValue === lastMonth).monthName,
      this.months.find( three => three.monthValue === secondLastMonth).monthName];
  }

  openDialog(cell: number): void {
    this.selectedPurchaseItem = this.purchaseOrders[cell];
    this.paymentInfo = new PaymentInfo();
    this.paymentInfo.billID = this.selectedPurchaseItem.orderID;
    this.paymentInfo.paymentID = this.selectedPurchaseItem.paymentID;
    this.paymentInfo.transactionTotal = this.selectedPurchaseItem.orderTotal;
    this.paymentInfo.transactionType = TransactionType.Purchase;
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '450px',
      data: this.paymentInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
