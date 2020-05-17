import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { MonthModel, Organisation, TransactionType, MonthlySummary, EmployeeDetails } from 'src/app/models/bill-common-model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  currentMonth: string;
  public months: Array<MonthModel> = [];
  paulOffsetSell: Array<number> = [];
  paulOffsetPurchase: Array<number> = [];
  paulBoxSell: Array<number> = [];
  paulBoxPurchase: Array<number> = [];
  last3Months: Array<string> = [];
  paulBoxMonthlySummary: MonthlySummary = new MonthlySummary();
  paulOffsetMonthlySummary: MonthlySummary = new MonthlySummary();
  employees$: Observable<EmployeeDetails[]>;
  selectedOrganisation = Organisation.PO;
  displayedColumns: string[] = ['employeeID', 'name', 'mobile', 'organisation', 'salary'];
  dataSource = [
    {position: 1, name: 'Hydrogen', mobile: 1.0079, organisation: 'H', salary: 5600},
    {position: 2, name: 'Helium', mobile: 4.0026, organisation: 'He', salary: 5600},
    {position: 3, name: 'Lithium', mobile: 6.941, organisation: 'Li', salary: 5600}
  ];
  orgnisations: Array<string> = [];
  organisationControl = new FormControl('', Validators.required);
  constructor(private billService: BillService, private commonService: CommonService,
              public dialog: MatDialog) { }
  ngOnInit() {
    this.billService.setMonthList();
    this.months = this.billService.getMonthList();
    this.currentMonth = this.months[new Date().getMonth() ].monthName;
    this.FetchLast3Months();
    this.FetchGraphData(Organisation.PB);
    this.FetchGraphData(Organisation.PO);
    this.FetchMonthlySummary(Organisation.PB);
    this.FetchMonthlySummary(Organisation.PO);
    this.fetchEmployeeDetails(this.selectedOrganisation);
    this.orgnisations = this.commonService.getOrganisations();
    this.organisationControl.setValue(this.selectedOrganisation);
  }
  FetchGraphData(organisation: string): void {
    this.commonService.displayLoader(true);
    this.billService.FetchLast3MonthsGraphData(organisation).subscribe( response => {
      this.commonService.displayLoader(false);
      response.forEach( refElem => {
        if (organisation === Organisation.PB) {
          if ( refElem.level === TransactionType.Sell) {
            this.paulBoxPurchase = refElem.data;
          }
          if ( refElem.level === TransactionType.Purchase) {
            this.paulBoxSell = refElem.data;
          }
        }
        if (organisation === Organisation.PO) {
          if ( refElem.level === TransactionType.Sell) {
            this.paulOffsetPurchase = refElem.data;
          }
          if ( refElem.level === TransactionType.Purchase) {
            this.paulOffsetSell = refElem.data;
          }
        }
      });
    });
  }

  FetchLast3Months(): void {
    let count = 3;
    let month = new Date().getMonth();
    while (count) {
      this.last3Months.push( this.months[month].monthName);
      count--; month--;
    }
  }
  FetchMonthlySummary(organisation: string): void {
    this.commonService.displayLoader(true);
    this.billService.fetchMonthlySummary(organisation, 2020, 5).subscribe( summary => {
      this.commonService.displayLoader(false);
      if ( organisation === Organisation.PB) {
        this.paulBoxMonthlySummary = summary;
      }
      if ( organisation === Organisation.PO) {
        this.paulOffsetMonthlySummary = summary;
      }
    }, (Err) => {console.log('error occured while fetching monthly summary ${organisation}', Err);
                 this.commonService.displayLoader(false); });
  }
  fetchEmployeeDetails(organisation: string): void {
    this.employees$ = this.billService.fetchEmployeeDetails(organisation);
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(DialogAddEmployeeComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result) {
        this.fetchEmployeeDetails(this.selectedOrganisation);
      }
    });
  }

  organisationChange(organisation: string): void {
    console.log('org change event fired for - ', this.organisationControl.value);
    this.selectedOrganisation = organisation === Organisation.PO ? Organisation.PO : Organisation.PB;
    this.fetchEmployeeDetails(organisation);
  }
}
