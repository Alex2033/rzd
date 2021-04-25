import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPushNotifyComponent } from './confirm-push-notify.component';

describe('ConfirmPushNotifyComponent', () => {
  let component: ConfirmPushNotifyComponent;
  let fixture: ComponentFixture<ConfirmPushNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPushNotifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPushNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
