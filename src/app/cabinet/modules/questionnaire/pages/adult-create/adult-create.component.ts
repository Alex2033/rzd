import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CyrillicToLatinPipe } from 'src/app/shared/pipes/cyrilic-to-latin.pipe';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { QuestionnaireDetailInterface } from '../../types/questionnaire-detail.interface';
import { UpdatedFieldInterface } from '../../types/updated-field.interface';

@Component({
  selector: 'app-adult-create',
  templateUrl: './adult-create.component.html',
  styleUrls: ['./adult-create.component.scss'],
})
export class AdultCreateComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;
  public currentStep: number = 1;
  public citizenships: object[] = [
    {
      label: 'Гражданин РФ (паспорт РФ)',
      value: 'RESIDENT_PASSPORT',
    },
    {
      label: 'Нерезидент РФ (загран. паспорт)',
      value: 'FOREIGN_PASSPORT',
    },
  ];

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  get formLength(): number {
    return Object.keys(this.createForm.controls).length;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cyrillicToLatin: CyrillicToLatinPipe,
    private router: Router,
    private questionnairesService: QuestionnairesService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getQuestionnaire();
    this.getQueryParams();
    this.nameControlChanges();
    this.surnameControlChanges();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      basicData: new FormGroup({
        name: new FormControl('', Validators.required),
        name_lat: new FormControl('', [Validators.required]),
        surname: new FormControl('', Validators.required),
        surname_lat: new FormControl('', [Validators.required]),
        patronymic: new FormControl(''),
        birthday: new FormControl('', [Validators.required]), // проверить на правильность введенных данных
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
        ]),
        sex: new FormControl('', [Validators.required]),
      }),
      document: new FormGroup({
        citizenship: new FormControl('', Validators.required),
        passport_number: new FormControl('', Validators.required),
        passport_org: new FormControl('', Validators.required),
        passport_date: new FormControl('', [Validators.required]),
      }),
      registerAddress: new FormGroup({
        adress_reg_country: new FormControl('', Validators.required),
        adress_reg_region: new FormControl('', Validators.required),
        adress_reg_area: new FormControl('', Validators.required),
        adress_reg_city: new FormControl('', Validators.required),
        adress_reg_street: new FormControl('', Validators.required),
        adress_reg_building: new FormControl('', Validators.required),
        adress_reg_flat: new FormControl(''),
      }),
      actualResidence: new FormGroup({
        adress_fact_country: new FormControl('', Validators.required),
        adress_fact_region: new FormControl('', Validators.required),
        adress_fact_area: new FormControl('', Validators.required),
        adress_fact_city: new FormControl('', Validators.required),
        adress_fact_street: new FormControl('', Validators.required),
        adress_fact_building: new FormControl('', Validators.required),
        adress_fact_flat: new FormControl('', Validators.required),
      }),
      workplace: new FormGroup({
        company: new FormControl('', Validators.required),
        position: new FormControl('', Validators.required),
      }),
    });
  }

  getQuestionnaire(): void {
    this.route.params
      .pipe(
        switchMap((e) => this.questionnairesService.getQuestionnaire(+e.id))
      )
      .subscribe((res) => {
        this.setControlsValues(this.createForm, res);
        this.updateFields(this.createForm, res.id);
      });
  }

  setControlsValues(group, questionnaire: QuestionnaireDetailInterface): void {
    Object.keys(group.controls).forEach((key) => {
      let formControl = group.controls[key];

      if (formControl instanceof FormGroup) {
        this.setControlsValues(formControl, questionnaire);
        return;
      }

      if (questionnaire.content[key]) {
        formControl.setValue(questionnaire.content[key]);
      }
    });
  }

  updateFields(group, id: number): void {
    Object.keys(group.controls).forEach((key) => {
      let formControl = group.controls[key];

      if (formControl instanceof FormGroup) {
        this.updateFields(formControl, id);
      } else {
        formControl.valueChanges
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((res: string) => {
              if (key && res) {
                const updatedField: UpdatedFieldInterface = {
                  id_anketa: id,
                  field: key,
                  new_val: res,
                };
                return this.questionnairesService.updateField(updatedField);
              }
              return of();
            })
          )
          .subscribe();
      }
    });
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe((e) => {
      this.currentStep = +e.step;
    });
  }

  nameControlChanges(): void {
    const name = this.createForm.get('basicData').get('name');
    const name_lat = this.createForm.get('basicData').get('name_lat');

    name.valueChanges.subscribe((res: string) => {
      if (!name_lat.touched) {
        name_lat.markAsTouched();
      }
      name_lat.setValue(this.cyrillicToLatin.transform(res));
    });
  }

  surnameControlChanges(): void {
    const surname = this.createForm.get('basicData').get('surname');
    const surname_lat = this.createForm.get('basicData').get('surname_lat');

    surname.valueChanges.subscribe((res: string) => {
      if (!surname_lat.touched) {
        surname_lat.markAsTouched();
      }
      surname_lat.setValue(this.cyrillicToLatin.transform(res));
    });
  }

  submit(): void {}

  next(): void {
    if (this.currentGroup.valid && this.currentStep !== this.formLength) {
      this.currentStep += 1;
      this.router.navigate([], { queryParams: { step: this.currentStep } });
      return;
    }

    this.currentGroup.markAllAsTouched();
    this.currentGroup.updateValueAndValidity();
  }

  back(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      this.router.navigate([], { queryParams: { step: this.currentStep } });
      return;
    }

    this.router.navigate(['/cabinet', 'questionnaires']);
  }

  getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.createForm.controls).map((groupName) =>
      this.createForm.get(groupName)
    ) as FormGroup[];

    return groups[index - 1];
  }
}
