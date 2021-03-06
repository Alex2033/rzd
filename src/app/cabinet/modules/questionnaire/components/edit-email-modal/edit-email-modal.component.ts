import { EditableFieldInterface } from './../../types/editable-field.interface';
import { takeUntil } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { CreateSheetComponent } from '../create-sheet/create-sheet.component';
import { ReplaySubject } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-edit-email-modal',
  templateUrl: './edit-email-modal.component.html',
  styleUrls: ['./edit-email-modal.component.scss'],
})
export class EditEmailModalComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    public _bottomSheetRef: MatBottomSheetRef<CreateSheetComponent>,
    private formBuilder: FormBuilder,
    private account: AccountService,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { value: string }
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.form.get('email').setValue(this.data.value, { emitEvent: false });
    this.checkEmailsMatch();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      emailConfirm: new FormControl(null, [Validators.required]),
    });
  }

  submit(): void {
    const data: EditableFieldInterface = {
      type: 'email',
      value: this.form.get('email').value,
    };
    this._bottomSheetRef.dismiss(data);
  }

  checkEmailsMatch(): void {
    const email = this.form.get('email');
    const emailConfirm = this.form.get('emailConfirm');

    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      if (email.value && email.value !== emailConfirm.value) {
        emailConfirm.setErrors({
          does_not_match: '???????? Email ???? ??????????????????',
        });
      } else {
        emailConfirm.setErrors(null);
      }
    });
  }

  setValueFromProfile(): void {
    this.form.get('email').setValue(this.account.user$.value.email);
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
