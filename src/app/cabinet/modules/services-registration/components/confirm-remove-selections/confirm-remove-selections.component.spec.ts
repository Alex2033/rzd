import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRemoveSelectionsComponent } from './confirm-remove-selections.component';

describe('ConfirmRemoveSelectionsComponent', () => {
  let component: ConfirmRemoveSelectionsComponent;
  let fixture: ComponentFixture<ConfirmRemoveSelectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRemoveSelectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRemoveSelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
