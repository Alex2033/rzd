import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultFirstStepComponent } from './adult-first-step.component';

describe('AdultFirstStepComponent', () => {
  let component: AdultFirstStepComponent;
  let fixture: ComponentFixture<AdultFirstStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultFirstStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
