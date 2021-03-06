import { HeaderModule } from './shared/layout/header/header.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './shared/layout/navigation-menu/navigation-menu.component';
import { UserMenuComponent } from './shared/layout/user-menu/user-menu.component';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NotFoundComponent } from './not-found/not-found.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  CustomDatePickerAdapter,
  CUSTOM_DATE_FORMATS,
} from './shared/date-adapter';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeRu, 'ru');
registerLocaleData(localeEn, 'en-US');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    UserMenuComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    HeaderModule,
    GoogleTagManagerModule.forRoot({
      id: 'GTM-MNMP264',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    },
    { provide: DateAdapter, useClass: CustomDatePickerAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
