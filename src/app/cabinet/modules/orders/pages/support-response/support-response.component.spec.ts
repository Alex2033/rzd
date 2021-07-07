import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportResponseComponent } from './support-response.component';

describe('SupportResponseComponent', () => {
  let component: SupportResponseComponent;
  let fixture: ComponentFixture<SupportResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
