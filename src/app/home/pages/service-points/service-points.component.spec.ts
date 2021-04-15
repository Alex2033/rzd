import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePointsComponent } from './service-points.component';

describe('ServicePointsComponent', () => {
  let component: ServicePointsComponent;
  let fixture: ComponentFixture<ServicePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
