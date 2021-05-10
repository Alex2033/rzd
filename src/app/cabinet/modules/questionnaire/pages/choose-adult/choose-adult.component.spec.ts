import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAdultComponent } from './choose-adult.component';

describe('ChooseAdultComponent', () => {
  let component: ChooseAdultComponent;
  let fixture: ComponentFixture<ChooseAdultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAdultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAdultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
