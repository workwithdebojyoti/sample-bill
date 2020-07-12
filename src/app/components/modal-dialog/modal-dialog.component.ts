import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { TransactionType, PaymentDetails, PaymentInfo } from 'src/app/models/bill-common-model';
import { BillService } from 'src/app/services/bill.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  paymentDetailsAdded: boolean;
  paymentDetails: PaymentDetails = new PaymentDetails();
  headerContent = 'Update payment recieved status';
  paymentModes: Array<string> = ['Cash', 'Cheque', 'Net Banking'];
  paymentTypeControl = new FormControl('', [Validators.required]);
  paymentStatusControl = new FormControl('', [Validators.required]);
  paymentRefNumberControl = new FormControl('', [Validators.required]);
  paymentRecievedControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<ModalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PaymentDetails, private billService: BillService,
              private purchaseOrderService: PurchaseOrderService) {
      // this.billAmountControl.setValue(data.billTotal);
      this.paymentRefNumberControl.setValue('N/A');
    }

  ngOnInit() {
    if (this.data.id > 0 ) {
      this.FetchPaymentDetails(this.data.id);
    }
    this.paymentRecievedControl.setValue(0);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addPaymentDetails(): void {
    if (this.data.id > 0 ) {
      return;
    }
    this.GetFormValues();
    this.billService.InsertPaymentDetails(this.paymentDetails).subscribe( response => {
      this.paymentDetails.id = response;
      this.UpdateTransactionPaymentStatus();
    }, (Err) => { console.log('error occured while inserting payment details', Err); });
  }

  FetchPaymentDetails(paymentId: number): void {
    this.billService.FetchPaymentDetails(paymentId).subscribe( response => {
      if (response) {
        this.paymentDetails = response;
        this.SetInitialValues();
      }
    }, (err) => { console.log('error occured while fetching payment details', err); });
  }

  SetInitialValues(): void {
    this.paymentTypeControl.setValue(this.paymentDetails.paymentType -1);
    this.paymentRefNumberControl.setValue(this.paymentDetails.paymentReferenceNumber);
    this.paymentRecievedControl.setValue(this.paymentDetails.paymentReceived);
    this.paymentDetails.paymentAmount
  }
  GetFormValues(): void {
    this.paymentDetails.paymentAmount = this.paymentRecievedControl.value;
    this.paymentDetails.paymentMode = this.paymentTypeControl.value;
    this.paymentDetails.paymentReferenceNumber = this.paymentRefNumberControl.value;
  }
  UpdateTransactionPaymentStatus(): void {
    let paymentStatus = 'Due';
    if (+this.paymentRecievedControl.value === this.data.paymentAmount) {
      paymentStatus = 'Done';
    }
    if (this.data.paymentMode === TransactionType.Sell) {
      this.billService.UpdatePaymentDetails(
        this.data.id, this.paymentDetails.id, paymentStatus
        ).subscribe(
          (response: boolean) => {
            this.paymentDetailsAdded = response;
          }, (err) => {
            console.log('error occured in adding payment details', err);
          }
        );
      }
    if (this.data.paymentMode === TransactionType.Purchase) {
        this.purchaseOrderService.UpdatePaymentDetails(
          this.data.id, this.paymentDetails.id, paymentStatus
          ).subscribe(
            (response: boolean) => {
              this.paymentDetailsAdded = response;
            }, (err) => {
              console.log('error occured in adding payment details', err);
            }
          );
        }
  }
}
