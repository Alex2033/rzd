import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyQuestionnairesComponent } from './empty-questionnaires.component';

describe('EmptyQuestionnairesComponent', () => {
  let component: EmptyQuestionnairesComponent;
  let fixture: ComponentFixture<EmptyQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyQuestionnairesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
