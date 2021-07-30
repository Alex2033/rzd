import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCorporateClientsComponent } from './confirm-corporate-clients.component';

describe('ConfirmCorporateClientsComponent', () => {
  let component: ConfirmCorporateClientsComponent;
  let fixture: ComponentFixture<ConfirmCorporateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCorporateClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCorporateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
