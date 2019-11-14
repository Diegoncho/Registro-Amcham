import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAmChamComponent } from './amcham/registro-am-cham.component';
import { StandsBusinessComponent } from './stands-business/stands-business.component';
import { RifaBusinessComponent } from './rifa-business/rifa-business.component';
import { EncuestaAmChamComponent } from './encuesta/encuesta-am-cham.component';
import { DoneComponent } from './done/done.component';
import { DoneEncuestaComponent } from './done-encuesta/done-encuesta.component';
import { DoneStandComponent } from './done-stand/done-stand.component';

const routes: Routes = [
  { path: '', component: RegistroAmChamComponent },
  { path: 'done', component: DoneComponent },
  { path: 'rifa', component: RifaBusinessComponent },
  { path: 'stand', component: StandsBusinessComponent },
  { path: 'stand/done', component: DoneStandComponent },
  { path: 'encuesta', component: EncuestaAmChamComponent },
  { path: 'encuesta/done', component: DoneEncuestaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
