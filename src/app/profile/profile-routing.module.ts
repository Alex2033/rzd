import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditNameComponent } from './pages/edit-name/edit-name.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
