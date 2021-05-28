import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  retry,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { DoctypeInterface } from '../../types/doctype.interface';
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
  public cities: string[] = [
    'с. Кудиново, Калужская обл.',
    'с. Кудиново, Калужская обл.',
    'с. Кудиново, Калужская обл.',
    'с. Кудиново, Калужская обл.',
  ];
  public isChild: boolean = false;
  public doctypes: DoctypeInterface[] = [];
  public activeDoctype: DoctypeInterface;
  public today: Date = new Date();
  public isLoading: boolean = false;

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
    private router: Router,
    private questionnairesService: QuestionnairesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getQuestionnaire();
    this.getQueryParams();
    this.singleChanges();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      basicData: new FormGroup({
        doc_type: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        surname: new FormControl(null, Validators.required),
        patronymic: new FormControl(null),
        birthday: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.minLength(11),
        ]),
        sex: new FormControl(null, [Validators.required]),
      }),
      document: new FormGroup({
        passport_number: new FormControl(null, Validators.required),
        passport_org: new FormControl(null, Validators.required),
        passport_date: new FormControl(null, [Validators.required]),
      }),
      registerAddress: new FormGroup({
        adress_reg_country: new FormControl(null, Validators.required),
        adress_reg_city: new FormControl(null, Validators.required),
        adress_reg_street: new FormControl(null, Validators.required),
        adress_reg_building: new FormControl(null, Validators.required),
        adress_reg_flat: new FormControl(null),
      }),
      actualResidence: new FormGroup({
        adress_single: new FormControl(null),
        adress_fact_country: new FormControl(null, Validators.required),
        adress_fact_city: new FormControl(null, Validators.required),
        adress_fact_street: new FormControl(null, Validators.required),
        adress_fact_building: new FormControl(null, Validators.required),
        adress_fact_flat: new FormControl(null),
      }),
      workplace: new FormGroup({
        company: new FormControl(null),
        company_address: new FormControl(null),
        position: new FormControl(null),
      }),
    });
  }

  getQuestionnaire(): void {
    this.route.params
      .pipe(
        switchMap((e) => this.questionnairesService.getQuestionnaire(+e.id)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        if (res.id_parent !== 0) {
          this.isChild = true;
          this.removeControls();
        }
        this.getDocTypes();

        this.setControlsValues(this.createForm, res);
        this.updateAllFields(this.createForm, res.id);
      });
  }

  removeControls(): void {
    (this.createForm.get('basicData') as FormGroup).removeControl('email');
    (this.createForm.get('basicData') as FormGroup).removeControl('phone');
    this.createForm.removeControl('workplace');
  }

  setControlsValues(group, questionnaire: QuestionnaireDetailInterface): void {
    Object.keys(group.controls).forEach((key) => {
      let formControl = group.controls[key];

      if (formControl instanceof FormGroup) {
        this.setControlsValues(formControl, questionnaire);
        return;
      }

      if (questionnaire.content[key]) {
        if (questionnaire.content[key] === '0001-01-01T00:00:00') {
          return;
        } else {
          formControl.setValue(questionnaire.content[key]);
        }
      }
    });
  }

  updateAllFields(group, id: number): void {
    Object.keys(group.controls).forEach((key) => {
      let formControl = group.controls[key];

      if (formControl instanceof FormGroup) {
        this.updateAllFields(formControl, id);
      } else {
        formControl.valueChanges
          .pipe(
            tap(() => (this.isLoading = true)),
            debounceTime(800),
            distinctUntilChanged(),
            switchMap((res: string) => this.updateSingleField(res, key, id)),
            catchError((err) => {
              if (err.error.error === 'FIO_LANG_MISMATCH') {
                const name = this.createForm.get('basicData').get('name');
                const surname = this.createForm.get('basicData').get('surname');

                this.createForm.get('document').reset();

                name.setValue(null);
                surname.setValue(null);

                surname.markAsTouched();
                name.markAsTouched();

                name.setErrors({
                  not_correct: true,
                });
                surname.setErrors({
                  not_correct: true,
                });
              }
              return of(err);
            }),
            retry(),
            takeUntil(this.destroy)
          )
          .subscribe();
      }
    });
  }

  updateSingleField(res: string, key: string, id: number): Observable<void> {
    if (this.createForm.get('actualResidence').get('adress_single').value) {
      if (
        key === 'adress_fact_country' ||
        key === 'adress_fact_city' ||
        key === 'adress_fact_street' ||
        key === 'adress_fact_building' ||
        key === 'adress_fact_flat'
      ) {
        this.isLoading = false;
        return of(null);
      }
    }

    if (key === 'birthday' || key === 'passport_date') {
      res = this.datePipe.transform(res, 'YYYY-MM-dd T HH:mm:ss');
    }

    if (!res && key !== 'adress_single') {
      this.isLoading = false;
      return of(null);
    }

    const updatedField: UpdatedFieldInterface = {
      id_anketa: id,
      field: key,
      new_val: res?.toString(),
    };

    return this.questionnairesService
      .updateField(updatedField)
      .pipe(finalize(() => (this.isLoading = false)));
  }

  getQueryParams(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy)).subscribe((e) => {
      this.currentStep = +e.step;
    });
  }

  submit(): void {
    if (!this.isLoading) {
      this.router.navigate(['/cabinet', 'questionnaires']);
    }
  }

  next(): void {
    if (this.currentStep === 1) {
      this.activeDoctype = this.doctypes.find(
        (doc) =>
          doc.val === this.createForm.get('basicData').get('doc_type').value
      );
      if (this.activeDoctype) {
        this.setLanguageValidator();
        this.createForm.get('basicData').get('name').updateValueAndValidity();
        this.createForm
          .get('basicData')
          .get('surname')
          .updateValueAndValidity();
        this.isLoading = false;
      }
    }

    if (this.currentGroup.valid && this.currentStep <= this.formLength) {
      this.currentStep += 1;

      if (this.currentStep > this.formLength) {
        this.submit();
        return;
      }

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

  singleChanges(): void {
    const controls = (this.createForm.get('actualResidence') as FormGroup)
      .controls;

    controls['adress_single'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((res) => {
        if (res) {
          this.createForm.get('actualResidence').disable();
          this.createForm.get('actualResidence').get('adress_single').enable();
          this.equalizeAddresses(res);
        } else {
          this.createForm.get('actualResidence').enable();
        }
      });
  }

  getDocTypes(): void {
    this.questionnairesService
      .getDocumentTypes(this.isChild)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.doctypes = res;
        this.docTypeChanges();
      });
  }

  docTypeChanges(): void {
    const basicData = this.createForm.get('basicData');

    basicData.get('doc_type').valueChanges.subscribe((val: string) => {
      this.activeDoctype = this.doctypes.find((doc) => doc.val === val);
      this.setLanguageValidator();
      basicData.get('name').updateValueAndValidity();
      basicData.get('surname').updateValueAndValidity();
    });
  }

  setLanguageValidator(): void {
    const basicData = this.createForm.get('basicData');

    if (this.activeDoctype.fioLat) {
      basicData
        .get('name')
        .setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
        ]);
      basicData
        .get('surname')
        .setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
        ]);
    } else {
      basicData
        .get('name')
        .setValidators([
          Validators.required,
          Validators.pattern('^[а-яА-Я ]*$'),
        ]);
      basicData
        .get('surname')
        .setValidators([
          Validators.required,
          Validators.pattern('^[а-яА-Я ]*$'),
        ]);
    }
  }

  equalizeAddresses(res): void {
    const controls = (this.createForm.get('registerAddress') as FormGroup)
      .controls;
    const actualResidence = this.createForm.get('actualResidence');

    actualResidence.setValue({
      adress_single: res,
      adress_fact_country: controls['adress_reg_country'].value,
      adress_fact_city: controls['adress_reg_city'].value,
      adress_fact_street: controls['adress_reg_street'].value,
      adress_fact_building: controls['adress_reg_building'].value,
      adress_fact_flat: controls['adress_reg_flat'].value,
    });
  }
}
