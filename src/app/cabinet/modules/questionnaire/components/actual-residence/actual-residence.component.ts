import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actual-residence',
  templateUrl: './actual-residence.component.html',
  styleUrls: ['./actual-residence.component.scss'],
})
export class ActualResidenceComponent implements OnInit {
  @Input() actualResidence: FormGroup;
  @Input() cities: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
