import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlugComponent } from './plug/plug.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./questionnaire/questionnaire.module').then(
  //       (m) => m.QuestionnaireModule
  //     ),
  // },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./cabinet/cabinet.module').then((m) => m.CabinetModule),
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
