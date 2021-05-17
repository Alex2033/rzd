import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsConfirmComponent } from './sms-confirm.component';

describe('SmsConfirmComponent', () => {
  let component: SmsConfirmComponent;
  let fixture: ComponentFixture<SmsConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
