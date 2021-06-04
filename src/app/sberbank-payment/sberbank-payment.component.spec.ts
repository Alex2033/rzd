import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SberbankPaymentComponent } from './sberbank-payment.component';

describe('SberbankPaymentComponent', () => {
  let component: SberbankPaymentComponent;
  let fixture: ComponentFixture<SberbankPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SberbankPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SberbankPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
