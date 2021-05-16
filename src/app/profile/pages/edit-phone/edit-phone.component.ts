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
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.scss'],
})
export class EditPhoneComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  public user: AuthResponseInterface = {} as AuthResponseInterface;
  public loading: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
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
    });
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
    const { error, value } = err.error;

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
}
