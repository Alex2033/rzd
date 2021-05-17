import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss'],
})
export class EditEmailComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  public user: AuthResponseInterface = {} as AuthResponseInterface;
  public loading: boolean = false;
  public emailControl: AbstractControl;
  public emailConfirmControl: AbstractControl;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  get email(): AbstractControl {
    return this.editForm.get('email');
  }

  get emailConfirm(): AbstractControl {
    return this.editForm.get('emailConfirm');
  }

  get emailsMatches(): boolean {
    if (this.email.value && this.email.value !== this.emailConfirm.value) {
      return false;
    }
    return true;
  }

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createForm();
    this.initializeValues();
    this.checkEmailsMatch();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  initializeValues(): void {
    this.emailControl = this.email;
    this.emailConfirmControl = this.emailConfirm;
  }

  checkEmailsMatch(): void {
    this.editForm.valueChanges.subscribe(() => {
      if (this.email.value && this.email.value !== this.emailConfirm.value) {
        this.emailConfirm.setErrors({
          does_not_match: 'Поля Email не совпадают',
        });
      } else {
        this.emailConfirm.setErrors(null);
      }
    });
  }

  getUser(): void {
    this.auth.getUser().subscribe((user) => (this.user = user));
  }

  createForm(): void {
    this.editForm = this.formBuilder.group({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      emailConfirm: new FormControl(null),
    });
  }

  submit(): void {
    this.loading = true;
    const updatedUser: AuthResponseInterface = {
      ...this.user,
      email: this.email.value,
    };
    this.auth
      .updateUser(updatedUser)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err);
          }
        }
      );
  }

  private setErrors(err: HttpErrorResponse): void {
    const { error, value } = err.error;

    switch (error) {
      case 'EMAIL_LENGTH':
        this.email.setErrors({
          incorrect_email_length: `Не более ${value} символов`,
        });
        break;
      case 'EMAIL_ALREADY_EXISTS':
        this.email.setErrors({
          email_already_exists: 'Этот email уже занят',
        });
        break;

      default:
        break;
    }
  }
}
