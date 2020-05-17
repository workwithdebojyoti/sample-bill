import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-billing-app';
  public currentDate: Date = new Date();
  selectedTabBill = true;
  selectedTabPurchase = false;
  selectedTabPS = false;
  selectedTabSS = false;
  selectedTabExpense = false;
  public changeTab(tabName: string): void {
    this.resetTabSelection();
    switch (tabName) {
      case 'bill' : this.selectedTabBill = true; break;
      case 'purchase' : this.selectedTabPurchase = true; break;
      case 'purchase-summary' : this.selectedTabPS = true; break;
      case 'sell-summary' : this.selectedTabSS = true; break;
      case 'expense' : this.selectedTabExpense = true; break;
    }
  }

  resetTabSelection(): void {
    this.selectedTabBill = false;
    this.selectedTabExpense = false;
    this.selectedTabPS = false;
    this.selectedTabPurchase = false;
    this.selectedTabSS = false;
  }
}
