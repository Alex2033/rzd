import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CyrillicToLatinPipe } from 'src/app/shared/pipes/cyrilic-to-latin.pipe';

@Component({
  selector: 'app-adult-create',
  templateUrl: './adult-create.component.html',
  styleUrls: ['./adult-create.component.scss'],
})
export class AdultCreateComponent implements OnInit {
  public createForm: FormGroup;
  public currentStep: number = 1;

  get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cyrillicToLatin: CyrillicToLatinPipe
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getQueryParams();
    this.nameControlChanges();
    this.surnameControlChanges();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      firstStep: new FormGroup({
        name: new FormControl('', Validators.required),
        name_lat: new FormControl('', [Validators.required]),
        surname: new FormControl('', Validators.required),
        surname_lat: new FormControl('', [Validators.required]),
        patronymic: new FormControl(''),
        birthday: new FormControl('', [Validators.required]), // проверить на правильность введенных данных
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required]),
        sex: new FormControl('', [Validators.required]),
      }),
    });
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe((e) => {
      this.currentStep = +e.step;
    });
  }

  nameControlChanges(): void {
    const name = this.createForm.get('firstStep').get('name');
    const name_lat = this.createForm.get('firstStep').get('name_lat');

    name.valueChanges.subscribe((res: string) => {
      if (!name_lat.touched) {
        name_lat.markAsTouched();
      }
      name_lat.setValue(this.cyrillicToLatin.transform(res));
    });
  }

  surnameControlChanges(): void {
    const surname = this.createForm.get('firstStep').get('surname');
    const surname_lat = this.createForm.get('firstStep').get('surname_lat');

    surname.valueChanges.subscribe((res: string) => {
      if (!surname_lat.touched) {
        surname_lat.markAsTouched();
      }
      surname_lat.setValue(this.cyrillicToLatin.transform(res));
    });
  }

  submit(): void {}

  next(): void {
    if (this.currentGroup.valid) {
      this.currentStep += 1;
      return;
    }

    this.currentGroup.markAllAsTouched();
    this.currentGroup.updateValueAndValidity();
  }

  getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.createForm.controls).map((groupName) =>
      this.createForm.get(groupName)
    ) as FormGroup[];

    return groups[index - 1];
  }
}
