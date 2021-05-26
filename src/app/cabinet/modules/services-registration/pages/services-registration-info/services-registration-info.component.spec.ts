import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRegistrationInfoComponent } from './services-registration-info.component';

describe('ServicesRegistrationInfoComponent', () => {
  let component: ServicesRegistrationInfoComponent;
  let fixture: ComponentFixture<ServicesRegistrationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesRegistrationInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesRegistrationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
