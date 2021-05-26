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
  @Input() today: Date;

  get mask(): string {
    console.log('this.activeDoctype?.val:', this.activeDoctype?.val);
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
