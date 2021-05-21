import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';
import { CheckPhoneDataInterface } from 'src/app/shared/types/phone-data.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.scss'],
})
export class EditPhoneComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  public user: AuthResponseInterface = {} as AuthResponseInterface;
  public loading: boolean = false;
  public submitted: boolean = false;
  public resendCode: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createForm();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getUser(): void {
    this.auth.getUser().subscribe((user) => (this.user = user));
  }

  createForm(): void {
    this.editForm = this.formBuilder.group({
      phone: new FormControl(this.user.phone, [
        Validators.required,
        Validators.minLength(11),
      ]),
      code: new FormGroup({
        control1: new FormControl(null, [Validators.required]),
        control2: new FormControl(null, [Validators.required]),
        control3: new FormControl(null, [Validators.required]),
        control4: new FormControl(null, [Validators.required]),
      }),
    });
  }

  checkPhone(): void {
    this.loading = true;

    const phoneData: CheckPhoneDataInterface = {
      phone: this.editForm.get('phone').value,
      isProfilePhone: true,
    };

    this.profileService
      .checkPhone(phoneData)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        () => {
          this.submitted = true;
          this.editForm.get('code').reset();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err);
          }
        }
      );
  }

  submit(): void {
    this.loading = true;

    const updatedUser: AuthResponseInterface = {
      ...this.user,
      phone: this.editForm.get('phone').value,
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
    const { error } = err.error;

    switch (error) {
      case 'PHONE_ALREADY_EXISTS':
        this.editForm.get('phone').setErrors({
          not_unique_phone: 'Номер телефона уже занят',
        });
        break;

      default:
        break;
    }
  }

  changeSubmitted(val: boolean): void {
    this.submitted = val;
    this.editForm.markAllAsTouched();
  }
}
