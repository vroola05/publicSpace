import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { PsLibModule } from 'ps-lib';


registerLocaleData(localeNl, 'nl');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PsLibModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
