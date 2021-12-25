import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [DatePipe],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public showReturnDate: boolean = false;
  public minDate: Date = new Date();

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servicesRegistration: ServicesRegistrationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() - 15);
    this.createForm();
    this.abroadStatusChanges();
    if (this.form.get('been_abroad').value) {
      this.showReturnDate = true;
    }
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      been_abroad: new FormControl(
        this.servicesRegistration.order.been_abroad,
        [Validators.required]
      ),
      symptoms: new FormControl(false, [Validators.required]),
      patientContact: new FormControl(false, [Validators.required]),
      abroad_return_date: new FormControl(
        Date.parse(this.servicesRegistration.order.abroad_return_date)
          ? this.servicesRegistration.order.abroad_return_date
          : ''
      ),
    });
  }

  abroadStatusChanges(): void {
    const returnDate = this.form.get('abroad_return_date');

    this.form
      .get('been_abroad')
      .valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((res: boolean) => {
        if (res) {
          this.showReturnDate = true;
          this.form
            .get('abroad_return_date')
            .setValidators([Validators.required]);
        } else {
          this.showReturnDate = false;
          returnDate.setValue(null);
          returnDate.markAsUntouched();
          returnDate.clearValidators();
        }
        returnDate.updateValueAndValidity();
      });
  }

  submit(): void {
    const symptomsVal = this.form.get('symptoms').value;
    const contactVal = this.form.get('patientContact').value;
    const been_abroad = this.form.get('been_abroad').value;
    const abroad_return_date = this.datePipe.transform(
      this.form.get('abroad_return_date').value,
      'yyyy-MM-dd'
    );

    if (symptomsVal || contactVal) {
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'blocking-screen',
      ]);
    } else {
      this.servicesRegistration.setOrder({
        abroad_return_date: abroad_return_date
          ? abroad_return_date
          : new Date(null),
        been_abroad,
      });
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'select-point',
        this.servicesRegistration.order.id,
      ]);
    }
  }
}
