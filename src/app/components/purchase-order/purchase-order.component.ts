import { Component, OnInit } from '@angular/core';
import { PurchaseOrder, Tabs, Organisation } from 'src/app/models/bill-common-model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  public buyers: Array<string>;
  public gstRateList: Array<number>;
  public billTotal: number;
  public totalGST: number;
  public gstRate: string;
  public selectedBiller = 'Select Buyer';
  public selectedBuyer = 'Select Buyer';
  public paymentMode: Array<string>;
  public paymentStatus: Array<string>;
  public purchaseOrder: PurchaseOrder;
  public purchaseOrderAdded: boolean;
  public purchaseOrderPlaced: boolean;
  buyerControl = new FormControl('', [Validators.required]);
  gstRateControl = new FormControl('', [Validators.required]);
  constructor(private purchaseOrderService: PurchaseOrderService, private commonService: CommonService) {
    this.buyers =  this.commonService.getOrganisations();
    this.gstRateList = this.commonService.getGSTRateList();
    this.paymentMode = this.commonService.getPaymentModes();
    this.paymentStatus = this.commonService.getPaymentStatus();
    this.purchaseOrder = new PurchaseOrder();
  }

  ngOnInit() {
  }
  /**
   * Changes the biller
   * @param biller | string
   */
  changeBuyer(buyer: string): void {
    this.selectedBuyer = buyer;
    this.purchaseOrder.buyerName = this.selectedBuyer;
  }
  calculateGST(billTotal: number): void {
    this.totalGST = (billTotal / 100) * (+this.gstRateControl.value);
    this.purchaseOrder.orderGST = this.totalGST;
    this.purchaseOrder.orderCGST = this.totalGST / 2;
    this.purchaseOrder.orderSGST = this.totalGST / 2;
  }
  /**
   * Add order to internal database for monitoring
   */
  addOrder(): void {
    this.purchaseOrder.gstRate = +this.gstRateControl.value;
    this.purchaseOrder.buyerName = this.buyerControl.value;
    this.purchaseOrderService.saveOrderDetails(this.purchaseOrder).subscribe( (response: any) => {
      this.purchaseOrderAdded = response;
      this.purchaseOrderPlaced = true;
    });
  }
  FetchSelectedBillDate($selectedDate: any): void {
    this.purchaseOrder.orderDate = $selectedDate;
    console.log(Tabs.PurchaseTab + ' ' + this.purchaseOrder.orderDate);
  }
}
