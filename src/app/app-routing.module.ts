import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'server-error/:key',
    component: ServerErrorComponent,
  },
  {
    path: 'c', // используется как ссылка в смс, нужно как можно короче
    loadChildren: () =>
      import('./corporate-clients/corporate-clients.module').then(
        (m) => m.CorporateClientsModule
      ),
  },
  {
    path: 'qr',
    loadChildren: () =>
      import('./qr-navigation/qr-navigation.module').then(
        (m) => m.QrNavigationModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
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
