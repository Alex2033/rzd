import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOmsQuestionnairesComponent } from './empty-oms-questionnaires.component';

describe('EmptyOmsQuestionnairesComponent', () => {
  let component: EmptyOmsQuestionnairesComponent;
  let fixture: ComponentFixture<EmptyOmsQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyOmsQuestionnairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyOmsQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
