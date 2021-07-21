import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/date-adapter';
import { DoctypeInterface } from '../../types/doctype.interface';
import { EditableFieldInterface } from '../../types/editable-field.interface';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class BasicDataComponent implements OnInit {
  @Input() basicData: FormGroup;
  @Input() isChild: boolean = false;
  @Input() doctypes: DoctypeInterface[] = [];
  @Input() activeDoctype: DoctypeInterface;
  @Input() min: Date;
  @Input() max: Date;

  @Output() editField: EventEmitter<EditableFieldInterface> =
    new EventEmitter<EditableFieldInterface>();

  constructor() {}

  ngOnInit(): void {}

  openEditingModal(type: string, value: string): void {
    const fieldData: EditableFieldInterface = {
      type,
      value,
    };

    this.editField.emit(fieldData);
  }
}
