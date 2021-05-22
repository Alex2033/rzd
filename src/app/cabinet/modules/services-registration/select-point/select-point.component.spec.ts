import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPointComponent } from './select-point.component';

describe('SelectPointComponent', () => {
  let component: SelectPointComponent;
  let fixture: ComponentFixture<SelectPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
