import { Component, OnInit} from '@angular/core';
import { BillDetails, MonthModel, PaymentInfo, TransactionType, MonthlySummary, Organisation, PaymentDetails } from 'src/app/models/bill-common-model';
import { BillService } from 'src/app/services/bill.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sell-details',
  templateUrl: './sell-details.component.html',
  styleUrls: ['./sell-details.component.css']
})
export class SellDetailsComponent implements OnInit {
  public sellers: Array<string> = [];
  public monthlySellList: Array<BillDetails> = [];
  public months: Array<MonthModel> = [];
  currentMonth: number;
  currentYear: number;
  billerControl = new FormControl('', [Validators.required]);
  monthControl = new FormControl('', [Validators.required]);
  yearControl = new FormControl('', [Validators.required]);
  selectedSellItem: BillDetails;
  paymentInfo: PaymentDetails;
  sellSummary: MonthlySummary = new MonthlySummary();
  constructor(private billService: BillService, public dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit() {
    this.sellers = this.commonService.getOrganisations();
    this.billService.setMonthList();
    this.months = this.billService.getMonthList();
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
    this.fetchMonthlySellSummary(this.currentMonth, this.currentYear, Organisation.PB);
    this.yearControl.setValue(this.currentYear);
    this.monthControl.setValue(this.currentMonth);
    this.billerControl.setValue(Organisation.PB);
    this.selectedSellItem = new BillDetails();
    this.fetchMonthlySummary(this.monthControl.value,
      this.yearControl.value, this.billerControl.value);
  }

  fetchMonthlySellSummary(month: number, year: number, seller: string): void {
    this.currentMonth = month;
    this.currentYear = year;
    this.billService.fetchMonthlySellSummary(month, year, seller).subscribe(
      response => {
        this.monthlySellList = response;
      }, (err) => {
        console.log(err);
      }
    );
  }

  getMonthlySellSummary(): void {
    this.fetchMonthlySellSummary(this.monthControl.value,
        this.yearControl.value, this.billerControl.value);
    this.fetchMonthlySummary(this.monthControl.value,
      this.yearControl.value, this.billerControl.value);
  }

  openDialog(cell: number): void {
    this.selectedSellItem = this.monthlySellList[cell];
    this.paymentInfo = this.selectedSellItem.paymentDetails;
    
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '450px',
      data: this.paymentInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  fetchMonthlySummary(month: number, year: number, organisation: string): void {
    this.billService.fetchMonthlySummary(organisation, year, month).subscribe( summary => {
      this.sellSummary = summary;
    }, (err) => { console.log('error occured while fetching monthly sell summary', err); });
  }
}
