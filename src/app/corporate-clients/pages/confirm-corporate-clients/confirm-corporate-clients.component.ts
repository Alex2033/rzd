import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CorporateClientsService } from 'src/app/shared/services/corporate-clients.service';
import { B2BClientInterface } from 'src/app/shared/types/b2b-client.interface';
import { CorporateClientInterface } from 'src/app/shared/types/corporate-client.interface';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/date-adapter';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirm-corporate-clients',
  templateUrl: './confirm-corporate-clients.component.html',
  styleUrls: ['./confirm-corporate-clients.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class ConfirmCorporateClientsComponent implements OnInit, OnDestroy {
  public client: CorporateClientInterface;
  public form: FormGroup;
  public isLoading: boolean = false;
  public reachedLimit: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private corporateClients: CorporateClientsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getClient();
    this.createForm();
  }

  getClient(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => this.corporateClients.getClient(params.c)),
        takeUntil(this.destroy)
      )
      .subscribe(
        (client) => {
          this.client = client;
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.router.navigate(['/auth', 'login']);
          }
        }
      );
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      birthday: new FormControl(null, [Validators.required]),
    });
  }

  setControlErrors(err: string): void {
    switch (err) {
      case 'USER_NOT_FOUND':
        this.form.get('birthday').setErrors({
          user_not_found: 'Пользователь с таким ид не найден',
        });
        break;
      case 'USER_BAD_STATUS':
        this.form.get('birthday').setErrors({
          user_bad_status: 'Регистрация уже подтверждена',
        });
        break;
      case 'INCORRECT_BIRTHDAY':
        this.form.get('birthday').setErrors({
          incorrect_birthday: 'Дата рождения указана неверно.',
        });
        break;
      case 'ATTEMPTS_LIMIT':
        this.reachedLimit = true;
        break;
      default:
        break;
    }
  }

  submit(): void {
    this.isLoading = true;
    const data: B2BClientInterface = {
      id: this.client.id,
      birthday: this.datePipe.transform(
        this.form.get('birthday').value,
        'yyyy-MM-dd'
      ),
    };

    this.corporateClients
      .confirmClient(data)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy)
      )
      .subscribe(
        () => {
          this.router.navigate(['/cabinet', 'questionnaires']);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setControlErrors(err.error.error);
          }
        }
      );
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
