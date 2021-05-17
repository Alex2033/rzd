import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adult-first-step',
  templateUrl: './adult-first-step.component.html',
  styleUrls: ['./adult-first-step.component.scss'],
})
export class AdultFirstStepComponent implements OnInit {
  @Input() firstStep: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
