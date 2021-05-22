import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CitizenshipInterface } from '../../types/citizenship.interface';

@Component({
  selector: 'app-document-step',
  templateUrl: './document-step.component.html',
  styleUrls: ['./document-step.component.scss'],
})
export class DocumentStepComponent implements OnInit {
  @Input() documentStep: FormGroup;
  @Input() citizenship: CitizenshipInterface[] = [];

  public mask: string;

  constructor() {}

  ngOnInit(): void {
    this.documentStep
      .get('citizenship')
      .valueChanges.subscribe((res: string) => {
        this.getMask(res);
      });
  }

  getMask(value: string): void {
    switch (value) {
      case 'FOREIGN_PASSPORT':
        this.mask = '00 0000000';
        break;

      case 'BIRTH_CERTIFICATE':
        this.mask = 'II-AA 000000 или IIV-AA 000000';
        break;

      default:
        this.mask = '0000 000000';
        break;
    }
  }
}
