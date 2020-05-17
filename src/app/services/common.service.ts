import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

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
    console.log('LoaderService.display ' + value);
    this.loaderStatus.next(value);
  }
}
