import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderComponent } from '../app/components/purchase-order/purchase-order.component';
import { BillHomeComponent } from './components/bill-home/bill-home.component';
import { ViewPurchaseOrderComponent } from './components/view-purchase-order/view-purchase-order.component';
import { BillPreviewComponent } from './components/bill-preview/bill-preview.component';
import { SellDetailsComponent } from './components/sell-details/sell-details.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
const routes: Routes = [
  {
    path: 'purchase', component: PurchaseOrderComponent
},
{
  path: 'bill', component: BillHomeComponent
},
{
  path: 'purchase-summary', component: ViewPurchaseOrderComponent
},
{
  path: 'bill-preview', component: BillPreviewComponent
},
{
  path: 'sell-summary', component: SellDetailsComponent
},
{
  path: 'expense', component: ExpenseComponent
},
{
  path: 'dash-board', component: DashBoardComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
