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
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.scss'],
})
export class EditNameComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  public user: AuthResponseInterface = {} as AuthResponseInterface;
  public loading: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private account: AccountService,
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
    this.account
      .getUser()
      .pipe(takeUntil(this.destroy))
      .subscribe((user) => (this.user = user));
  }

  createForm(): void {
    this.editForm = this.formBuilder.group({
      name: new FormControl(this.user.name, [Validators.required]),
    });
  }

  submit(): void {
    this.loading = true;
    const updatedUser: AuthResponseInterface = {
      ...this.user,
      name: this.editForm.get('name').value,
    };
    this.account
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
      case 'NAME_LENGTH':
        this.editForm.get('name').setErrors({
          incorrect_name_length: `Не более ${value} символов`,
        });
        break;

      default:
        break;
    }
  }
}
