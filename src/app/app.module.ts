import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationMenuComponent } from './shared/layout/navigation-menu/navigation-menu.component';
import { UserMenuComponent } from './shared/layout/user-menu/user-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlugComponent } from './plug/plug.component';
import { LanguagesResolver } from './shared/resolvers/language.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationMenuComponent,
    UserMenuComponent,
    PlugComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
  ],
  providers: [LanguagesResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
