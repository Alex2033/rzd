import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { NavigationMenuComponent } from './shared/layout/navigation-menu/navigation-menu.component';
import { UserMenuComponent } from './shared/layout/user-menu/user-menu.component';
import { LanguagesResolver } from './shared/resolvers/language.resolver';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import { ClickOutsideDirective } from './shared/directives/click-outside/click-outside.directive';
import localeRu from '@angular/common/locales/ru';
import { NotFoundComponent } from './not-found/not-found.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationMenuComponent,
    UserMenuComponent,
    ClickOutsideDirective,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
  ],
  providers: [
    LanguagesResolver,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
