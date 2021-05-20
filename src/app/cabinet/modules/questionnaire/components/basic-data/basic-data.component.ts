import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss'],
})
export class BasicDataComponent implements OnInit {
  @Input() basicData: FormGroup;
  @Input() isChild: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
