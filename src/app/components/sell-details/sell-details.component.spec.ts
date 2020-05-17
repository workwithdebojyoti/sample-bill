import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellDetailsComponent } from './sell-details.component';

describe('SellDetailsComponent', () => {
  let component: SellDetailsComponent;
  let fixture: ComponentFixture<SellDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
