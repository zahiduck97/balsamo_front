import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "./modulos/index/index.component";
import {CommonModule} from "@angular/common";
import {AgendarComponent} from "./modulos/agendar/agendar.component";
import {PageNotFoundComponent} from "./modulos/page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: '', component: IndexComponent,
  },
  {
    path: 'agendar', component: AgendarComponent,
  },
  {
    path: '**', component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
