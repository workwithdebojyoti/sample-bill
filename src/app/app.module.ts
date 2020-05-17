import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillHomeComponent } from './components/bill-home/bill-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogContentRegisterPartyComponent } from './components/dialog-content-register-party/dialog-content-register-party.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ViewPurchaseOrderComponent } from './components/view-purchase-order/view-purchase-order.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { CustomDatepickerComponent } from './components/custom-datepicker/custom-datepicker.component';
import { DemoMaterialModule } from './material-module';
import { BillPreviewComponent } from './components/bill-preview/bill-preview.component';
import { SellDetailsComponent } from './components/sell-details/sell-details.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ExpenseComponent } from './components/expense/expense.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonService } from './services/common.service';
import { DialogAddEmployeeComponent } from './components/dialog-add-employee/dialog-add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    BillHomeComponent,
    ConfirmPopupComponent,
    DialogComponent,
    DialogContentRegisterPartyComponent,
    PurchaseOrderComponent,
    ViewPurchaseOrderComponent,
    CustomDatepickerComponent,
    BillPreviewComponent,
    SellDetailsComponent,
    ExpenseComponent,
    ModalDialogComponent,
    DashBoardComponent,
    LoaderComponent,
    DialogAddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    BsDropdownModule.forRoot(),
    DropDownsModule,
    DateInputsModule,
    GridModule,
    DemoMaterialModule,
    ChartsModule,
    ExcelModule
  ],
  entryComponents: [DialogComponent, DialogContentRegisterPartyComponent, ModalDialogComponent, DialogAddEmployeeComponent],
  bootstrap: [AppComponent],
  providers: [
    CommonService
  ]
})
export class AppModule { }
