import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { Item, PartyDetails, Bill, DeliveryDetails, PaymentDetails, PaymentType } from 'src/app/models/bill-common-model';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bill-home',
  templateUrl: './bill-home.component.html',
  styleUrls: ['./bill-home.component.css']
})
export class BillHomeComponent implements OnInit {
  public billers: Array<string> = [];
  public deliveryOptions: Array<string> = [];
  public billTypes: Array<string> = [];
  public partyDetails: PartyDetails = new PartyDetails();
  public registeredParty = true;
  public selectedBiller = 'Select Biller';
  // Dynamic row Addition
  private fieldArray: Array<Item> = [];
  private newAttribute: Item;
  public totalSGST: number;
  public totalCGST: number;
  public totalTax: number;
  public total: number;
  public billData: Bill;
  public billnumber: string;
  public deliveryDetails: DeliveryDetails;
  public paymentDetails: PaymentDetails;
  billerControl = new FormControl('', [Validators.required]);
  billTypeControl = new FormControl('', [Validators.required]);
  deliveryControl = new FormControl('', [Validators.required]);

  public billDetailsForm: FormGroup;
  public partyDetailsForm: FormGroup;
  public deliveryDetailsForm: FormGroup;
  /* Constructor */
  constructor(private billService: BillService, private router: Router, private commonService: CommonService, 
    private _snackBar: MatSnackBar) {
    this.initializeDeliveryDetailsForm();
    this.initializeBillDetailsForm();
    this.initializePartyDetailsForm();
    this.billers = ['Paul Offset', 'Paul Box'];
    this.billTypes = ['Cash Bill', 'GST Bill'];
    this.deliveryOptions = ['Van', 'Vehical'];
    // this.fieldArray = new Array<Item>();
    this.newAttribute = new Item();
    this.total = 0;
    this.totalCGST = 0;
    this.totalSGST = 0;
    this.totalTax = 0;
    this.billData = new Bill();
    this.billnumber = '';
  }

  ngOnInit() {
    this.billerControl.setValue('Paul Box');
    this.billTypeControl.setValue('Cash Bill');
  }
  onSubmit(): void {
    console.log('Submit Called');
  }
  checkPartyStatus(): void {
    this.commonService.displayLoader(true);
    this.partyDetails.mobileNumber = this.partyDetailsForm.controls['mobileNumber'].value;
    // this.partyDetails.partyName
    if (!this.partyDetails.mobileNumber) {
      alert('please enter a valid mobile number!');
      this.commonService.displayLoader(false);
      return;
    }
    this.billService.fetchPartyDetails(this.partyDetails.mobileNumber.toString()).subscribe(response => {
      this.commonService.displayLoader(false);
      this.registeredParty = false;
      if (response) {
        this.registeredParty = true;
        this.partyDetails = response;
        this.partyDetailsForm.controls['partyName'].setValue(this.partyDetails.partyName);
      } else {
        this.registeredParty = false;
      }
    }, (err) => {
      console.log('Some Error Occured', err);
      this.commonService.displayLoader(false);
    });
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = new Item();
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  changeBiller(biller: string): void {
    this.selectedBiller = biller;
    this.billData.billerName = this.selectedBiller;
  }
  calculateTax(newAttribute: Item): void {
    newAttribute.itemTotal = (+newAttribute.itemQuantity * +newAttribute.itemRate / 1000);
    newAttribute.itemTotalTax = newAttribute.itemTotal * +newAttribute.itemTaxPercentage / 100;
    newAttribute.itemTotal += newAttribute.itemTotalTax;
    this.calculateTotal(newAttribute);
  }

  calculateTotal(newAttribute: Item): void {
    this.total += +newAttribute.itemTotal;
    this.totalSGST += +newAttribute.itemTotalTax / 2;
    this.totalCGST += +newAttribute.itemTotalTax / 2;
    this.totalTax += +newAttribute.itemTotalTax;
    this.setBillDetailsFormValue(this.total, this.totalTax, this.totalSGST, this.totalCGST);
  }

  generateBill(): void {
    if (!this.registeredParty || this.total === 0) {
      alert('either party not registered or the bill amount is zero');
      return;
    }
    debugger;
    this.commonService.displayLoader(true);
    this.generatePaymentDetailsRequest();
    this.generateDeliveryDetailsRequest();
    // this.billData.itemList = this.fieldArray;
    this.billData.billTotalAmount = this.total;
    this.billData.billTotalSgst = this.totalSGST;
    this.billData.billTotalCgst = this.totalCGST;
    this.billData.billTotalTax = this.totalTax;
    this.billData.billNumber = this.billDetailsForm.controls['billNumber'].value;
    this.billData.billerName = this.billerControl.value;
    // this.billData.billDate = ;
    this.billData.billType = this.billTypeControl.value === 'GST Bill' ? 1 : 0;
    // this.billData.billPaymentStatus = false;
    
    // this.billData.refDeliveryId = 0;
    this.insertDeliveryAndPaymentDetailsForBill();
  }

  saveBill(): void {
    this.commonService.displayLoader(true);
    this.billService.saveBillData(this.billData).subscribe(response => {
      if (response) {
        this.billService.setBillData(this.billData);
        this.commonService.displayLoader(false);
        this._snackBar.open('bill added successfully!', 'dismiss', { duration: 3000});
        this.reset();
      }
      
    }, (err) => {
      console.log(err);
      this.commonService.displayLoader(false);
    });
  }
  FetchSelectedBillDate($event: any): void {
    this.billData.billDate = $event;
    this.billDetailsForm.controls['billDate'].setValue(this.billData.billDate);
  }
  /**
   * Initializes the bill details forms for validation
   */
  initializeBillDetailsForm(): void {
    this.billDetailsForm = new FormGroup({
      billerName: new FormControl('', [Validators.required]),
      billType: new FormControl('', [Validators.required]),
      billNumber: new FormControl('', [Validators.required]),
      billDate: new FormControl('', [Validators.required]),
      billTotal: new FormControl('', [Validators.required]),
      billTotalTax: new FormControl('', [Validators.required]),
      billSGST: new FormControl('', [Validators.required]),
      billCGST: new FormControl('', [Validators.required]),
    });
    this.setBillDetailsFormValue(0, 0, 0, 0);
  }
  initializePartyDetailsForm(): void {
    this.partyDetailsForm = new FormGroup({
      partyName: new FormControl('', [Validators.required]),
      partyId: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required])
    });
  }
  initializeDeliveryDetailsForm(): void {
    this.deliveryDetailsForm = new FormGroup({
      deliveredBy: new FormControl('', [Validators.required]),
      deliveryAddress: new FormControl('', [Validators.required]),
      fare: new FormControl('', [Validators.required])
    });
    this.setDeliveryDetailsFormValue('Van', ' ', 0);
  }
  /**
   * 
   * @param billTotal 
   * @param totalTax 
   * @param sgst 
   * @param cgst 
   */
  setBillDetailsFormValue(billTotal: number, totalTax: number, sgst: number, cgst: number): void {
    this.billDetailsForm.controls['billTotal'].setValue(billTotal);
    this.billDetailsForm.controls['billTotalTax'].setValue(totalTax);
    this.billDetailsForm.controls['billSGST'].setValue(sgst);
    this.billDetailsForm.controls['billCGST'].setValue(cgst);
  }
  /**
   * sets the default values in the form
   * @param deliveredBy 
   * @param deliveryAddress 
   * @param fare 
   */
  setDeliveryDetailsFormValue(deliveredBy: string, deliveryAddress: string, fare: number): void {
    this.deliveryDetailsForm.controls['deliveredBy'].setValue(deliveredBy);
    this.deliveryDetailsForm.controls['deliveryAddress'].setValue(deliveryAddress);
    this.deliveryDetailsForm.controls['fare'].setValue(fare);
  }


  generateDeliveryDetailsRequest(): void {
    this.deliveryDetails = new DeliveryDetails();
    this.deliveryDetails.id = 0;
    this.deliveryDetails.deliveryCharge = +this.deliveryDetailsForm.controls['fare'].value;
    this.deliveryDetails.deliveryAddress = this.deliveryDetailsForm.controls['deliveryAddress'].value;
    this.deliveryDetails.deliveryMode = this.deliveryDetailsForm.controls['deliveredBy'].value;
    this.deliveryDetails.deliveryDate = new Date();
  }

  generatePaymentDetailsRequest(): void {
    this.paymentDetails = new PaymentDetails();
    this.paymentDetails.paymentType = PaymentType.Sell;
    this.paymentDetails.paymentMode = 1;
    this.paymentDetails.paymentStatus = null;
    this.paymentDetails.paymentDate = null;
    this.paymentDetails.paymentAmount = 0;
    this.paymentDetails.paymentReferenceNumber = null;
    this.paymentDetails.billAmount = this.total;
  }

  insertDeliveryAndPaymentDetailsForBill(): void {
    let paymentHttp = this.billService.InsertPaymentDetails(this.paymentDetails);
    let deliveryHttp = this.billService.saveDeliveryDetails(this.deliveryDetails);
    forkJoin([paymentHttp, deliveryHttp]).subscribe(result => {
      this.billData.refPaymentId = result[0];
      this.billData.refDeliveryId = result[1];
      this.billData.refPartyId = this.partyDetails.id;
      this.saveBill();
    }, (err) => { this.commonService.displayLoader(false); });
  }

  reset(): void {
    this.billDetailsForm.reset();
    this.partyDetailsForm.reset();
    this.deliveryDetailsForm.reset();
    this.fieldArray = [];
    this.newAttribute = new Item();
  }

  calculateDeliveryCharge(): void {
    this.total  += +this.deliveryDetailsForm.controls['fare'].value;
    this.billDetailsForm.controls['billTotal'].setValue(this.total);
  }

}
