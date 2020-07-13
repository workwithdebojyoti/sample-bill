import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { PaymentDetails } from 'src/app/models/bill-common-model';
import { BillService } from 'src/app/services/bill.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  paymentDetailsAdded: boolean;
  paymentDetails: PaymentDetails = new PaymentDetails();
  headerContent = 'Update payment recieved status';
  paymentModes: Array<string> = ['Cash', 'Online', 'Cheque'];
  paymentTypeControl = new FormControl('', [Validators.required]);
  paymentStatusControl = new FormControl('', [Validators.required]);
  paymentRefNumberControl = new FormControl('', [Validators.required]);
  paymentRecievedControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<ModalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PaymentDetails, private billService: BillService,
              private commonService: CommonService) {
      // this.billAmountControl.setValue(data.billTotal);
      this.paymentRefNumberControl.setValue('N/A');
      debugger;
      console.log(this.data.billAmount);
    }

  ngOnInit() {
    // if (this.data.id > 0 ) {
    //   this.FetchPaymentDetails(this.data.id);
    // }
    this.SetInitialValues();
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
  SetInitialValues(): void {
    this.paymentTypeControl.setValue(this.paymentModes[this.data.paymentMode - 1]);
    this.paymentRefNumberControl.setValue(this.data.paymentReferenceNumber);
    this.paymentRecievedControl.setValue(this.data.paymentAmount);
  }
  GetFormValues(): void {
    this.paymentDetails.paymentAmount = this.paymentRecievedControl.value;
    switch(this.paymentTypeControl.value) {
      case 'Cash': this.paymentDetails.paymentMode = 1;
                  break;
      case 'Online': this.paymentDetails.paymentMode = 2;
                  break;
      case 'Cheque': this.paymentDetails.paymentMode = 3;
                  break;
    }
    this.paymentDetails.paymentReferenceNumber = this.paymentRefNumberControl.value;
  }
  UpdateTransactionPaymentStatus(): void {
    debugger;
    this.GetFormValues();
    let paymentStatus = 'due';
    if (+this.paymentRecievedControl.value === this.data.paymentAmount) {
      paymentStatus = 'done';
    }
    // if (this.data.paymentType === TransactionType.Sell) {
    //   this.billService.UpdatePaymentDetails(
    //     this.data.id, this.paymentDetails.id, paymentStatus
    //     ).subscribe(
    //       (response: boolean) => {
    //         this.paymentDetailsAdded = response;
    //       }, (err) => {
    //         console.log('error occured in adding payment details', err);
    //       }
    //     );
    //   }
    // if (this.data.paymentType === TransactionType.Purchase) {
    // this.purchaseOrderService.UpdatePaymentDetails(
    //       this.data.id, this.paymentDetails.id, paymentStatus
    //       ).subscribe(
    //         (response: boolean) => {
    //           this.paymentDetailsAdded = response;
    //         }, (err) => {
    //           console.log('error occured in adding payment details', err);
    //         }
    //       );
    //     }
    switch(paymentStatus) {
      case 'due': this.paymentDetails.paymentStatus = 1;
                  break;
      case 'done': this.paymentDetails.paymentStatus = 2;
                  break;
      default: this.paymentDetails.paymentStatus = 0;
                  break;
    }
    this.paymentDetails.id = this.data.id;
    this.commonService.displayLoader(true);
    this.commonService.UpdatePaymentDetails(this.paymentDetails).subscribe(
      response => {
        this.commonService.displayLoader(false);
      }, (err) => {
        console.log('error occured', err);
        this.commonService.displayLoader(false);
      }
    );
    
  }
}
