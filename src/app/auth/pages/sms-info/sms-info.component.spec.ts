import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsInfoComponent } from './sms-info.component';

describe('SmsInfoComponent', () => {
  let component: SmsInfoComponent;
  let fixture: ComponentFixture<SmsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
