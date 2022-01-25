import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginByEmailComponent } from './pages/login-by-email/login-by-email.component';
import { LoginByPhoneComponent } from './pages/login-by-phone/login-by-phone.component';
import { RegisterErrorComponent } from './pages/register-error/register-error.component';
import { RegisterComponent } from './pages/register/register.component';
import { SmsInfoComponent } from './pages/sms-info/sms-info.component';

const routes: Routes = [
  {
    path: 'login-by-phone',
    component: LoginByPhoneComponent,
  },
  {
    path: 'login-by-email',
    component: LoginByEmailComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'sms-info',
    component: SmsInfoComponent,
  },
  {
    path: 'register-error',
    component: RegisterErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
