import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsConfirmModule } from '../shared/modules/sms-confirm/sms-confirm.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorMessagesModule } from '../shared/modules/error-messages/error-messages.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';

import { ProfileComponent } from './pages/profile/profile.component';
import { EditNameComponent } from './pages/edit-name/edit-name.component';
import { EditEmailComponent } from './pages/edit-email/edit-email.component';
import { EditPhoneComponent } from './pages/edit-phone/edit-phone.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditNameComponent,
    EditEmailComponent,
    EditPhoneComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorMessagesModule,
    NgxMaskModule.forRoot(),
    SmsConfirmModule,
  ],
})
export class ProfileModule {}
