import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss'],
})
export class CreateQuestionnaireComponent implements OnInit {
  public createForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      firstStep: new FormGroup({
        searchTerm: new FormControl(''),
        category: new FormControl('one'),
      }),
      secondStep: new FormGroup({
        surname: new FormControl(''),
        date: new FormControl('one'),
      }),
    });
    console.log('this.createForm:', this.createForm);
  }

  submit(): void {}
}
