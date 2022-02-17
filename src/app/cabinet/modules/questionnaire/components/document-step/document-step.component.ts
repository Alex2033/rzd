import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DoctypeInterface } from '../../types/doctype.interface';

@Component({
  selector: 'app-document-step',
  templateUrl: './document-step.component.html',
  styleUrls: ['./document-step.component.scss'],
})
export class DocumentStepComponent implements OnInit {
  @Input() documentStep: FormGroup;
  @Input() activeDoctype: DoctypeInterface;
  @Input() min: Date;
  @Input() max: Date;

  public snilsMask: string = '000-000-000 00';

  get inputType(): string | null {
    switch (this.activeDoctype?.val) {
      case 'Паспорт гражданина РФ':
      case 'Загранпаспорт гражданина РФ':
      case 'Свидетельство о рождении':
        return 'numeric';

      default:
        return null;
    }
  }

  get seriesLength(): number | null {
    switch (this.activeDoctype?.val) {
      case 'Загранпаспорт гражданина РФ':
        return 2;

      case 'Свидетельство о рождении':
        return null;

      default:
        return 4;
    }
  }

  get numberLength(): number | null {
    switch (this.activeDoctype?.val) {
      case 'Загранпаспорт гражданина РФ':
        return 7;

      case 'Паспорт иностранного гражданина':
      case 'Другое':
        return 100;

      case 'Вид на жительство':
        return 9;

      default:
        return 6;
    }
  }

  get seriesMask(): string {
    switch (this.activeDoctype?.val) {
      case 'Загранпаспорт гражданина РФ':
      case 'Паспорт иностранного гражданина':
        return '00';

      case 'Свидетельство о рождении':
        return 'II-AA или IIV-AA';

      default:
        return '0000';
    }
  }

  get numberMask(): string {
    switch (this.activeDoctype?.val) {
      case 'Загранпаспорт гражданина РФ':
      case 'Паспорт иностранного гражданина':
        return '0000000';

      default:
        return '000000';
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
