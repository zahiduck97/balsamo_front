import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './modulos/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './modulos/navbar/navbar.component';
import { FooterComponent } from './modulos/footer/footer.component';
import { PageNotFoundComponent } from './modulos/page-not-found/page-not-found.component';
import { AgendarComponent } from './modulos/agendar/agendar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// Firebase
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule, BUCKET} from "@angular/fire/storage";

// Services
import {CitaService} from "./services/cita.service";



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    AgendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    CitaService,
    { provide: BUCKET, useValue: 'gs://balsamo-7e6f2.appspot.com' }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
