import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  retryWhen,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account.service';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { DoctypeInterface } from '../../types/doctype.interface';
import { QuestionnaireDetailInterface } from '../../types/questionnaire-detail.interface';
import { UpdatedFieldInterface } from '../../types/updated-field.interface';

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss'],
})
export class CreateQuestionnaireComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;
  public currentStep: number = 1;
  public isChild: boolean = false;
  public doctypes: DoctypeInterface[] = [];
  public activeDoctype: DoctypeInterface;
  public today: Date = new Date();
  public minAdultDate: Date = new Date(1900, 0, 1);
  public minDate: Date = new Date(
    new Date(Date.now()).setFullYear(this.today.getFullYear() - 18)
  );

  public maxAdultDate: Date = new Date(this.minDate.getTime() - 1 * 86400000);
  public minChildDate: Date = new Date(this.minDate.getTime() + 1 * 86400000);
  public isLoading: boolean = false;
  public questionnaire: QuestionnaireDetailInterface =
    {} as QuestionnaireDetailInterface;
  public parentQuestionnaire: QuestionnaireDetailInterface =
    {} as QuestionnaireDetailInterface;
  public pageLoaded: boolean = false;

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
    private datePipe: DatePipe,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getQuestionnaire();
    this.getQueryParams();
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
          Validators.pattern('^[+]*[]{0,1}[0-9]{1,4}[]{0,1}[\\s0-9]*$'),
        ]),
        sex: new FormControl(null, [Validators.required]),
      }),
      document: new FormGroup({
        passport_number: new FormControl(null, Validators.required),
        passport_org: new FormControl(null, Validators.required),
        passport_date: new FormControl(null, [Validators.required]),
        oms: new FormControl(null),
      }),
      actualResidence: new FormGroup({
        adress_fact_country: new FormControl(null, Validators.required),
        adress_fact_city: new FormControl(null, Validators.required),
        adress_fact_street: new FormControl(null, Validators.required),
        adress_fact_building: new FormControl(null, Validators.required),
        adress_fact_flat: new FormControl(null),
      }),
      registerAddress: new FormGroup({
        no_reg_address: new FormControl(null),
        adress_single: new FormControl(null),
        adress_reg_country: new FormControl(null, Validators.required),
        adress_reg_city: new FormControl(null, Validators.required),
        adress_reg_street: new FormControl(null, Validators.required),
        adress_reg_building: new FormControl(null, Validators.required),
        adress_reg_flat: new FormControl(null),
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
        switchMap((res) => {
          this.setControlsValues(this.createForm, res);
          this.updateAllFields(this.createForm, res.id);

          if (res.id_parent !== 0) {
            this.isChild = true;
            this.createForm.removeControl('workplace');
            return this.questionnairesService.getQuestionnaire(res.id_parent);
          }
          return of(null);
        }),
        switchMap((res) => {
          const basic = this.createForm.get('basicData');
          const reg = this.createForm.get('registerAddress');

          if (res) {
            this.setChildFromParent(res);
          } else if (!(basic.get('phone').value && basic.get('email').value)) {
            basic.get('phone').setValue(this.account.user$.value.phone);
            basic.get('email').setValue(this.account.user$.value.email);
          }

          if (reg.get('adress_single').value) {
            reg.get('no_reg_address').setValue(false, { emitEvent: false });
            reg.disable({ emitEvent: false });
            reg.get('adress_single').enable({ emitEvent: false });
            this.equalizeAddresses();
          } else if (reg.get('no_reg_address').value) {
            reg.disable({ emitEvent: false });
            reg.get('no_reg_address').enable({ emitEvent: false });
          } else {
            reg.enable({ emitEvent: false });
          }

          return this.questionnairesService.getDocumentTypes(this.isChild);
        }),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.doctypes = res;
        this.docTypeChanges();
        this.addressSingleChanges();
        this.noRegAddressChanges();
        this.pageLoaded = true;
      });
  }

  setChildFromParent(parent: QuestionnaireDetailInterface): void {
    if (Object.keys(parent).length === 0) {
      return;
    }
    const basicData = this.createForm.get('basicData');
    const reg = this.createForm.get('registerAddress');
    const fact = this.createForm.get('actualResidence');

    const controls = [
      {
        form: basicData,
        keys: ['email', 'phone'],
      },
      {
        form: fact,
        keys: [
          'adress_fact_country',
          'adress_fact_city',
          'adress_fact_street',
          'adress_fact_building',
          'adress_fact_flat',
        ],
      },
      {
        form: reg,
        keys: [
          'no_reg_address',
          'adress_single',
          'adress_reg_country',
          'adress_reg_city',
          'adress_reg_street',
          'adress_reg_building',
          'adress_reg_flat',
        ],
      },
    ];

    controls.forEach((control) => {
      control.keys.forEach((key) => {
        if (!control.form.get(key).value) {
          if (key === 'adress_single') {
            control.form
              .get(key)
              .setValue(parent.content[key], { emitEvent: false });
          } else {
            control.form.get(key).setValue(parent.content[key]);
          }
        }
      });
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
        if (questionnaire.content[key] === '0001-01-01T00:00:00') {
          return;
        } else {
          formControl.setValue(questionnaire.content[key], {
            emitEvent: false,
          });
        }
      }
    });
  }

  // todo эту строчку this.isLoading = false зарефакторить

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
            distinctUntilChanged((prev, cur) => {
              if (prev === cur) {
                this.isLoading = false;
              }
              return prev === cur;
            }),
            switchMap((res: string) => this.updateSingleField(res, key, id)),
            retryWhen((errors) =>
              errors.pipe(
                tap((err) => {
                  if (err instanceof HttpErrorResponse) {
                    this.setError(err, formControl);
                  }

                  if (err.error.error === 'FIO_LANG_MISMATCH') {
                    this.fioMismatch(formControl);
                  }
                })
              )
            ),
            takeUntil(this.destroy)
          )
          .subscribe();
      }
    });
  }

  setError(err: HttpErrorResponse, formControl: AbstractControl): void {
    const { error } = err.error;

    switch (error) {
      case 'FIELD_BAD_VALUE':
        formControl.setErrors({
          bad_value: 'Некорректное значение поля',
        });
        break;

      case 'FIELD_BAD_FORMAT':
        formControl.setErrors({
          bad_format: 'Неверный формат поля анкеты',
        });
        break;

      default:
        break;
    }
  }

  updateSingleField(res: string, key: string, id: number): Observable<void> {
    // преобразование даты для сервера
    if (key === 'birthday' || key === 'passport_date') {
      res = this.datePipe.transform(res, 'YYYY-MM-dd T HH:mm:ss');
    }

    // изменение типа документа обнуляет данные документа
    if (key === 'doc_type') {
      this.createForm.get('document').reset();
    }

    const updatedField: UpdatedFieldInterface = {
      id_anketa: id,
      field: key,
      new_val: res?.toString(),
    };

    return this.questionnairesService.updateField(updatedField).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  fioMismatch(formControl: AbstractControl): void {
    const name = this.createForm.get('basicData').get('name');
    const surname = this.createForm.get('basicData').get('surname');
    const doc_type = this.createForm.get('basicData').get('doc_type');

    if (formControl === doc_type) {
      name.setValue(null, { emitEvent: false });
      surname.setValue(null, { emitEvent: false });

      surname.markAsTouched();
      name.markAsTouched();

      name.setErrors({
        not_correct: true,
      });
      surname.setErrors({
        not_correct: true,
      });
    } else {
      formControl.markAsTouched();
      formControl.setErrors({
        not_correct: true,
      });
    }
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

  addressSingleChanges(): void {
    const reg = this.createForm.get('registerAddress');

    if (!reg.get('adress_single').value) {
      this.resetRegisterAddress();
    }

    reg.get('adress_single').valueChanges.subscribe((res) => {
      reg.get('no_reg_address').setValue(false, { emitEvent: false });
      if (res) {
        reg.disable({ emitEvent: false });
        reg.get('adress_single').enable({ emitEvent: false });
        this.equalizeAddresses();
      } else {
        this.resetRegisterAddress();
        reg.enable({ emitEvent: false });
      }
    });
  }

  noRegAddressChanges(): void {
    const reg = this.createForm.get('registerAddress');

    reg.get('no_reg_address').valueChanges.subscribe((res) => {
      reg.get('adress_single').setValue(false, { emitEvent: false });
      if (res) {
        reg.patchValue({
          adress_reg_country: null,
          adress_reg_city: null,
          adress_reg_street: null,
          adress_reg_building: null,
          adress_reg_flat: null,
        });

        reg.disable({ emitEvent: false });
        reg.get('no_reg_address').enable({ emitEvent: false });
      } else {
        reg.enable({ emitEvent: false });
      }
    });
  }

  resetRegisterAddress(): void {
    const reg = this.createForm.get('registerAddress');

    reg.patchValue(
      {
        adress_reg_country: null,
        adress_reg_city: null,
        adress_reg_street: null,
        adress_reg_building: null,
        adress_reg_flat: null,
      },
      { emitEvent: false }
    );
  }

  docTypeChanges(): void {
    const basicData = this.createForm.get('basicData');

    if (basicData.get('doc_type').value) {
      this.setActiveDoctype(basicData.get('doc_type').value);
    }

    basicData.get('doc_type').valueChanges.subscribe((val: string) => {
      this.setActiveDoctype(val);
    });
  }

  setActiveDoctype(val: string): void {
    const basicData = this.createForm.get('basicData');

    this.activeDoctype = this.doctypes.find((doc) => doc.val === val);
    this.setLanguageValidator();
    basicData.get('name').updateValueAndValidity({ emitEvent: false });
    basicData.get('surname').updateValueAndValidity({ emitEvent: false });
  }

  setLanguageValidator(): void {
    const basicData = this.createForm.get('basicData');

    if (this.activeDoctype.fioLat) {
      basicData
        .get('name')
        .setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z _-]*$'),
        ]);
      basicData
        .get('surname')
        .setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z _-]*$'),
        ]);
    } else {
      basicData
        .get('name')
        .setValidators([
          Validators.required,
          Validators.pattern('^[а-яА-ЯёЁ _-]*$'),
        ]);
      basicData
        .get('surname')
        .setValidators([
          Validators.required,
          Validators.pattern('^[а-яА-ЯёЁ _-]*$'),
        ]);
    }
  }

  equalizeAddresses(): void {
    const controls = (this.createForm.get('actualResidence') as FormGroup)
      .controls;
    const reg = this.createForm.get('registerAddress');

    reg.patchValue(
      {
        adress_reg_country: controls['adress_fact_country'].value,
        adress_reg_city: controls['adress_fact_city'].value,
        adress_reg_street: controls['adress_fact_street'].value,
        adress_reg_building: controls['adress_fact_building'].value,
        adress_reg_flat: controls['adress_fact_flat'].value,
      },
      { emitEvent: false }
    );
  }
}
