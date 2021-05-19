import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualResidenceComponent } from './actual-residence.component';

describe('ActualResidenceComponent', () => {
  let component: ActualResidenceComponent;
  let fixture: ComponentFixture<ActualResidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualResidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
