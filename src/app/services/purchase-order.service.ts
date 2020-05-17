import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseOrder } from '../models/bill-common-model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private http: HttpClient) { }

  saveOrderDetails(purchaseOrder: PurchaseOrder): Observable<any> {
    const apiUrl = 'https://localhost:44342/api/product/purchaseorder';
    return this.http.post(apiUrl, purchaseOrder);
  }

  fetchPurchaseOrder(month: number, year: number, organisation: string): Observable<any> {
    let apiUrl = 'https://localhost:44342/api/product/purchaseorder/{organisation}/month/{month}/year/{year}';
    apiUrl = apiUrl.replace('{organisation}', organisation);
    apiUrl = apiUrl.replace('{month}', month.toString());
    apiUrl = apiUrl.replace('{year}', year.toString());
    return this.http.get(apiUrl);
  }
  fetchPurchaseOrderMonthlySummary(month: number, year: number, organisation: string): Observable<any> {
    let apiUrl = 'https://localhost:44342/api/product/purchaseorder/summary/{organisation}/month/{month}/year/{year}';
    apiUrl = apiUrl.replace('{organisation}', organisation);
    apiUrl = apiUrl.replace('{month}', month.toString());
    apiUrl = apiUrl.replace('{year}', year.toString());
    return this.http.get(apiUrl);
  }

  fetchLast3MonthsPurchaseTotal(organisation: string): Observable<any> {
    let apiUrl = 'https://localhost:44342/api/product/purchaseorder/summary/last3months/{organisation}/totalpurchase';
    apiUrl = apiUrl.replace('{organisation}', organisation);
    return this.http.get(apiUrl);
  }

  fetchLast3MonthsPurchaseGST(organisation: string): Observable<any> {
    let apiUrl = 'https://localhost:44342/api/product/purchaseorder/summary/last3months/{organisation}/totalgstpaid';
    apiUrl = apiUrl.replace('{organisation}', organisation);
    return this.http.get(apiUrl);
  }

  UpdatePaymentDetails(orderID: number, paymentID: number, paymentStatus: string): Observable<any> {
    let apiUrl =
    'https://localhost:44342/api/product/purchaseorder/{orderID}/paymentinfo/{paymentID}/status/{paymentStatus}';
    apiUrl = apiUrl.replace('{paymentID}', paymentID.toString());
    apiUrl = apiUrl.replace('{paymentStatus}', paymentStatus);
    apiUrl = apiUrl.replace('{orderID}', orderID.toString());
    return this.http.post(apiUrl, {});
  }
}
