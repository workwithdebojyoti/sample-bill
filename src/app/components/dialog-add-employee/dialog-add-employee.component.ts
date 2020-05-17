import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrls: ['./dialog-add-employee.component.css']
})
export class DialogAddEmployeeComponent implements OnInit {
  addEmployeeFormGroup: FormGroup;
  orgnisations: Array<string> = [];
  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
              private billService: BillService) { }

  ngOnInit() {
    this.addEmployeeFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      organisation: ['', Validators.required],
      mobile: ['', Validators.required],
    });
    this.orgnisations = this.commonService.getOrganisations();
  }

  addEmployee(): void {
    if ( this.addEmployeeFormGroup.invalid ) {
      return;
    }
    const employeeDetails = JSON.stringify(this.addEmployeeFormGroup.value);
    console.log(JSON.stringify(this.addEmployeeFormGroup.value));
    this.saveEmployee(this.addEmployeeFormGroup.value);
  }

  saveEmployee(employeeDetails: JSON): void {
    this.commonService.displayLoader(true);
    this.billService.saveEmployeeDetails(employeeDetails).subscribe( response => {
      debugger;
      this.commonService.displayLoader(false);
    }, (err) => { this.commonService.displayLoader(false); });
  }

}
