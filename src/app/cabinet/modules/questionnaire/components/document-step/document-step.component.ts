import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-step',
  templateUrl: './document-step.component.html',
  styleUrls: ['./document-step.component.scss'],
})
export class DocumentStepComponent implements OnInit {
  @Input() documentStep: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
