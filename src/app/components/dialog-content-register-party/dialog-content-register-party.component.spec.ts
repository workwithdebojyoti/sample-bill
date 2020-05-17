import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentRegisterPartyComponent } from './dialog-content-register-party.component';

describe('DialogContentRegisterPartyComponent', () => {
  let component: DialogContentRegisterPartyComponent;
  let fixture: ComponentFixture<DialogContentRegisterPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentRegisterPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentRegisterPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
