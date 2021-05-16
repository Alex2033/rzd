import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmailComponent } from './pages/edit-email/edit-email.component';
import { EditNameComponent } from './pages/edit-name/edit-name.component';
import { EditPhoneComponent } from './pages/edit-phone/edit-phone.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'edit-name',
    component: EditNameComponent,
  },
  {
    path: 'edit-email',
    component: EditEmailComponent,
  },
  {
    path: 'edit-phone',
    component: EditPhoneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
