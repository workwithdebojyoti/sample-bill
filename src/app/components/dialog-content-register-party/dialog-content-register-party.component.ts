import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PartyDetails } from 'src/app/models/bill-common-model';
import { BillService } from 'src/app/services/bill.service';
@Component({
  selector: 'app-dialog-content-register-party',
  templateUrl: './dialog-content-register-party.component.html',
  styleUrls: ['./dialog-content-register-party.component.css']
})
export class DialogContentRegisterPartyComponent implements OnInit {
  public firstName: string ;
  public lastName: string;
  constructor(@Inject(MAT_DIALOG_DATA) public party: PartyDetails, private billService: BillService) { }

  ngOnInit() {
  }
  registerParty(): void {
    console.log('Register Party Called.', this.party);
    this.party.partyName = this.firstName + ' ' + this.lastName;
    this.billService.savePartyDetails(this.party).subscribe(response => {
      if (response) {
        console.log('Party saved successfully');
      }
    }, (err) => {
      console.log(err);
    });
  }
}
