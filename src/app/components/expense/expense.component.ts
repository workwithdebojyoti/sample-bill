import { Component, OnInit } from '@angular/core';
import { LabourExpense, MonthlyExpense, MonthModel } from 'src/app/models/bill-common-model';
import { FormControl, Validators } from '@angular/forms';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  private fieldArray: Array<LabourExpense> = [];
  private newAttribute: LabourExpense = new LabourExpense();
  billers: string[];
  billerControl = new FormControl('', [Validators.required]);
  rentPaid: number = 0;
  salaryPaid: number = 0;
  electricityBillPaid: number = 0;
  otherExpense: number = 0;
  monthControl = new FormControl('', [Validators.required]);
  yearControl = new FormControl('', [Validators.required]);
  public months: Array<MonthModel> = [];
  constructor(private billService: BillService) { }

  ngOnInit() {
    this.billers =  ['Paul Offset', 'Paul Box'];
    this.billService.setMonthList();
    this.months = this.billService.getMonthList();
  }
  addFieldValue() {
    this.salaryPaid += +this.newAttribute.total;
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = new LabourExpense();
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }
  calculateTotal(newAttribute: LabourExpense): void {
    newAttribute.total = (newAttribute.w1Expense +
      newAttribute.w2Expense +
    newAttribute.w3Expense + newAttribute.w4Expense);
  }

  submitExpense(): void {
    const monthlyExpense = new MonthlyExpense();
    monthlyExpense.electricityExpense = this.electricityBillPaid;
    monthlyExpense.rentExpense = this.rentPaid;
    monthlyExpense.labourExpense = this.salaryPaid;
    monthlyExpense.otherExpense = this.otherExpense;
    monthlyExpense.organisation = this.billerControl.value;
    monthlyExpense.year = this.yearControl.value;
    monthlyExpense.month = this.billService.getMonthList()[this.monthControl.value - 1 ].monthName;
    monthlyExpense.monthNumber = this.monthControl.value;
    this.billService.InsertMonthlyExpenseDetails(monthlyExpense).subscribe(
      response => {
        console.log(response);
        if ( response) {
          this.fieldArray = [];
          this.salaryPaid = 0;
          this.rentPaid = 0;
          this.electricityBillPaid = 0;
          this.otherExpense = 0;
          alert('record added successfully');
        }
      }, (err) => {
        console.log(err);
      }
    );
  }
}
