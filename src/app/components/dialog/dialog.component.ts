import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentRegisterPartyComponent } from '../dialog-content-register-party/dialog-content-register-party.component';
import { PartyDetails } from 'src/app/models/bill-common-model';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnChanges {
  @Input() party: PartyDetails;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.party);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentRegisterPartyComponent, {
      data: this.party,
      height: '500px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
