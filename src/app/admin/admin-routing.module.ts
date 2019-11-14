import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrosComponent } from './registros/registros.component';
import { EventosComponent } from './eventos/eventos.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { StandsComponent } from './stands/stands.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
  { path: '', redirectTo: 'registrados', pathMatch: 'full' },
  { path: 'registrados', component: RegistrosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'asistentes', component: ParticipantesComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'resultados', component: ResultadosComponent},
  { path: 'stands', component: StandsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
