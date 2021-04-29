import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { QuestionnaireInterface } from '../../types/questionnaire.interface';

@Component({
  selector: 'app-create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrls: ['./create-sheet.component.scss'],
})
export class CreateSheetComponent implements OnInit {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CreateSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { questionnaires: QuestionnaireInterface[] }
  ) {}

  ngOnInit(): void {}

  selectQuestionnaire(type: string): void {
    this._bottomSheetRef.dismiss(type);
  }
}
