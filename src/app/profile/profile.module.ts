import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditNameComponent } from './pages/edit-name/edit-name.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessagesModule } from '../shared/modules/error-messages/error-messages.module';
import { EditEmailComponent } from './pages/edit-email/edit-email.component';
import { EditPhoneComponent } from './pages/edit-phone/edit-phone.component';
import { NgxMaskModule } from 'ngx-mask';

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
  ],
})
export class ProfileModule {}
