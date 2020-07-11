import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartyDetails } from 'src/app/models/bill-common-model';
import { BillService } from 'src/app/services/bill.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-dialog-content-register-party',
  templateUrl: './dialog-content-register-party.component.html',
  styleUrls: ['./dialog-content-register-party.component.css']
})
export class DialogContentRegisterPartyComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public registerPartyForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public party: PartyDetails,
  private billService: BillService, private commonService: CommonService,
  public dialogRef: MatDialogRef<DialogContentRegisterPartyComponent>) {
    this.initializeRegisterPartyForm();
  }

  ngOnInit() {
  }
  registerParty(): void {
    this.fetchFormValue();
    this.commonService.displayLoader(true);
    this.billService.savePartyDetails(this.party).subscribe(response => {
      this.commonService.displayLoader(false);
      this.registerPartyForm.reset();
      this.closeDialog();
    }, (err) => {
      this.commonService.displayLoader(false);
      console.log(err);
      alert('data can not be saved');
    });
  }

  initializeRegisterPartyForm(): void {
    this.registerPartyForm = new FormGroup({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      gstNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      stateInformation: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required])
    });
  }

  fetchFormValue(): void {
    this.party.partyName =
      this.registerPartyForm.controls['fName'].value + ' ' + this.registerPartyForm.controls['lName'].value;
    this.party.panNumber = this.registerPartyForm.controls['panNumber'].value;
    this.party.gstNumber = this.registerPartyForm.controls['gstNumber'].value;
    this.party.addressLine = this.registerPartyForm.controls['address'].value;
    this.party.city = this.registerPartyForm.controls['city'].value;
    this.party.stateInformation = this.registerPartyForm.controls['stateInformation'].value;
    this.party.zipCode = this.registerPartyForm.controls['zipcode'].value;
    this.party.addressLine = this.registerPartyForm.controls['address'].value;
    this.party.createdAt = new Date();
    this.party.updatedAt = new Date();
    this.party.id = 0;
  }

  closeDialog(): void {
    this.dialogRef.close('party registered');
  }
}
