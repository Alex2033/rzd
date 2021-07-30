import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCorporateClientsComponent } from './info-corporate-clients.component';

describe('InfoCorporateClientsComponent', () => {
  let component: InfoCorporateClientsComponent;
  let fixture: ComponentFixture<InfoCorporateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCorporateClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCorporateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
