import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.css']
})
export class CustomDatepickerComponent implements OnInit {
  minDate = new FormControl(new Date(2000, 0, 1));
  maxDate = new FormControl(new Date());
  date = new FormControl(new Date());
  @Output()
  selectedDate = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  changeDate(): void {
    this.selectedDate.emit(this.date.value);
  }
}
