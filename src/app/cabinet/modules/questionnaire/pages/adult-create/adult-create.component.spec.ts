import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultCreateComponent } from './adult-create.component';

describe('AdultCreateComponent', () => {
  let component: AdultCreateComponent;
  let fixture: ComponentFixture<AdultCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
