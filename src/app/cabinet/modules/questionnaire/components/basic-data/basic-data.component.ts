import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DoctypeInterface } from '../../types/doctype.interface';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss'],
})
export class BasicDataComponent implements OnInit {
  @Input() basicData: FormGroup;
  @Input() isChild: boolean = false;
  @Input() doctypes: DoctypeInterface[] = [];
  @Input() activeDoctype: DoctypeInterface;
  @Input() today: Date;

  constructor() {}

  ngOnInit(): void {}
}
