import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/date-adapter';
import { DoctypeInterface } from '../../types/doctype.interface';

@Component({
  selector: 'app-document-step',
  templateUrl: './document-step.component.html',
  styleUrls: ['./document-step.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class DocumentStepComponent implements OnInit {
  @Input() documentStep: FormGroup;
  @Input() activeDoctype: DoctypeInterface;
  @Input() today: Date;

  get mask(): string {
    switch (this.activeDoctype?.val) {
      case 'Загранпаспорт гражданина РФ':
      case 'Паспорт иностранного гражданина':
        return '00 0000000';

      case 'Свидетельство о рождении':
        return 'II-AA 000000 или IIV-AA 000000';

      default:
        return '0000 000000';
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
