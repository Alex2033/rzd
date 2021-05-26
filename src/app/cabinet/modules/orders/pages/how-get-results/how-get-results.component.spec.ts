import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowGetResultsComponent } from './how-get-results.component';

describe('HowGetResultsComponent', () => {
  let component: HowGetResultsComponent;
  let fixture: ComponentFixture<HowGetResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowGetResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowGetResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
