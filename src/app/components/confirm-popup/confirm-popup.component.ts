import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
  providers: [BsModalService]
})
export class ConfirmPopupComponent implements OnInit {
  // @Input() title: string = 'Modal with component';
  // @Input() message: string = 'Message here...';
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
  public clickOk() {
    console.log("Click ok...");
  }
}
