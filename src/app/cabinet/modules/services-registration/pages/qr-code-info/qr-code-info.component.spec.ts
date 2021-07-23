import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeInfoComponent } from './qr-code-info.component';

describe('QrCodeInfoComponent', () => {
  let component: QrCodeInfoComponent;
  let fixture: ComponentFixture<QrCodeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
