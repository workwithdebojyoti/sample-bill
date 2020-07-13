import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PaymentDetails } from '../models/bill-common-model';
import { Observable } from 'rxjs';
import { ServiceURL } from '../models/service-api-url';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private baseApiURL: string = 'https://localhost:44305/api/';
  constructor(private http: HttpClient) { }

  getOrganisations(): Array<string> {
    return ['Paul Offset', 'Paul Box'];
  }
  getPaymentModes(): Array<string> {
    return ['Cheque', 'Cash', 'Net Banking'];
  }
  getGSTRateList(): Array<number> {
    return [5, 12, 18, 28];
  }
  getPaymentStatus(): Array<string> {
    return ['Done', 'Due'];
  }
  displayLoader(value: boolean): void {
    this.loaderStatus.next(value);
  }

  UpdatePaymentDetails(paymentData: PaymentDetails): Observable<any> {
    let apiUrl = this.baseApiURL + ServiceURL.payment_details_put;
    return this.http.put(apiUrl, paymentData);
  }
}
