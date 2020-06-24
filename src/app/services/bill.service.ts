import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PartyDetails, Bill, MonthModel, MonthlyExpense,
  PaymentDetails, MonthlySummary, EmployeeDetails, Organisation
} from '../models/bill-common-model';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private billData: Bill;
  public months: Array<MonthModel> = [];
  constructor(private http: HttpClient) { }
  setBillData(billData: Bill): void {
    this.billData = billData;
  }
  getBillData(): Bill {
    return this.billData;
  }
  fetchPartyDetails(mobileNumber: string): Observable<PartyDetails> {
    let apiUrl = 'https://localhost:44305/api/Party/mobileNumber';
    const params = new HttpParams().set('mobileNumber', mobileNumber.toString());

    return this.http.get<PartyDetails>(apiUrl, {params});
  }
  saveBillData(billData: Bill): Observable<any> {
    const apiUrl = 'https://localhost:44342/api/product/submitbill';
    return this.http.post(apiUrl, billData);
  }

  savePartyDetails(party: PartyDetails): Observable<any> {
    const apiUrl = 'https://localhost:44342/api/product/party';
    return this.http.post(apiUrl, party);
  }

  fetchMonthlySellSummary(month: number, year: number, billerName: string): Observable<any> {
    let apiUrl = 'https://localhost:44342/api/product/purchaseorder/monthly/summary/{month}/year/{year}/{billerName}';
    apiUrl = apiUrl.replace('{month}', month.toString());
    apiUrl = apiUrl.replace('{billerName}', billerName);
    apiUrl = apiUrl.replace('{year}', year.toString());
    return this.http.get<Bill>(apiUrl);
  }

  setMonthList(): void {
    this.months.push(new MonthModel('January', 1));
    this.months.push(new MonthModel('February', 2));
    this.months.push(new MonthModel('March', 3));
    this.months.push(new MonthModel('April', 4));
    this.months.push(new MonthModel('May', 5));
    this.months.push(new MonthModel('June', 6));
    this.months.push(new MonthModel('July', 7));
    this.months.push(new MonthModel('August', 8));
    this.months.push(new MonthModel('September', 9));
    this.months.push(new MonthModel('October', 10));
    this.months.push(new MonthModel('November', 11));
    this.months.push(new MonthModel('December', 12));
  }

  getMonthList(): Array<MonthModel> {
    return this.months;
  }
  UpdatePaymentDetails(billID: number, paymentID: number, paymentStatus: string): Observable<any> {
    let apiUrl =
      'https://localhost:44342/api/product/selldetails/{billID}/paymentinfo/{paymentID}/status/{paymentStatus}';
    apiUrl = apiUrl.replace('{paymentID}', paymentID.toString());
    apiUrl = apiUrl.replace('{paymentStatus}', paymentStatus);
    apiUrl = apiUrl.replace('{billID}', billID.toString());
    return this.http.post(apiUrl, {});
  }

  InsertMonthlyExpenseDetails(expenseDetails: MonthlyExpense): Observable<any> {
    const apiUrl =
      'https://localhost:44342/api/product/expense/monthly';
    return this.http.post(apiUrl, expenseDetails);
  }

  FetchPaymentDetails(paymentId: number): Observable<any> {
    let apiUrl =
      'https://localhost:44342/api/product/payment/details/{paymentid}';
    apiUrl = apiUrl.replace('{paymentid}', paymentId.toString());
    return this.http.get<PaymentDetails>(apiUrl);
  }

  InsertPaymentDetails(paymentInfo: PaymentDetails): Observable<any> {
    const apiUrl =
      'https://localhost:44342/api/product/payment/details';
    return this.http.post(apiUrl, paymentInfo);
  }
  FetchLast3MonthsGraphData(organisationName: string): Observable<any> {
    let apiUrl = 'https://localhost:44342/api/product/purchaseorder/summary/last3months/{organisation}/totalgstpaid';
    apiUrl = apiUrl.replace('{organisation}', organisationName);
    return this.http.get<any>(apiUrl);
  }
  fetchMonthlySummary(billerName: string, year: number, month: number): Observable<any> {
    let apiUrl = 'https://localhost:44342/api/product/monthly/summary/{organisation}/{year}/{month}';
    apiUrl = apiUrl.replace('{organisation}', billerName);
    apiUrl = apiUrl.replace('{year}', year.toString());
    apiUrl = apiUrl.replace('{month}', month.toString());
    return this.http.get<MonthlySummary>(apiUrl);
  }

  fetchEmployeeDetails(organisation: string): Observable<Array<EmployeeDetails>> {
    let apiUrl = 'https://localhost:44342/api/product/employee/details/{organisation}';
    apiUrl = apiUrl.replace('{organisation}', organisation);
    return this.http.get<EmployeeDetails[]>(apiUrl).pipe();
  }

  saveEmployeeDetails(employee: JSON): Observable<boolean> {
    const apiUrl = 'https://localhost:44342/api/product/employee/details';
    return this.http.post<boolean>(apiUrl, employee);
  }
}
