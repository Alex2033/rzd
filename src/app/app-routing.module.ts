import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlugComponent } from './plug/plug.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LanguagesResolver } from './shared/resolvers/language.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { langId: LanguagesResolver },
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    resolve: { langId: LanguagesResolver },
    // canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cabinet',
    resolve: { langId: LanguagesResolver },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./cabinet/cabinet.module').then((m) => m.CabinetModule),
  },
  {
    path: 'profile',
    resolve: { langId: LanguagesResolver },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'plug',
    component: PlugComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
