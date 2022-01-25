import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginByPhoneComponent } from './login-by-phone.component';

describe('LoginByPhoneComponent', () => {
  let component: LoginByPhoneComponent;
  let fixture: ComponentFixture<LoginByPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginByPhoneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginByPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
