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
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servicesRegistration: ServicesRegistrationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.abroadStatusChanges();
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
    });
  }

  abroadStatusChanges(): void {
    this.form
      .get('been_abroad')
      .valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((res: boolean) => {
        if (res) {
          this.router.navigate([
            '/cabinet',
            'services-registration',
            'return-date',
          ]);
        }
      });
  }

  submit(): void {
    const symptomsVal = this.form.get('symptoms').value;
    const contactVal = this.form.get('patientContact').value;

    if (symptomsVal || contactVal) {
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'blocking-screen',
      ]);
    } else {
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'select-point',
      ]);
    }
  }
}
