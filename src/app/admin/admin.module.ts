import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AdminRoutingModule } from './admin-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../shared/shared.module';
import { AmChamService } from './servicios/amcham.service';
import { ConfigService } from './servicios/config.service';
import { ResultadoService } from './servicios/resultado.service';
import { EventoService } from './servicios/evento.service';
import { FiltroRegistrosPipe } from './servicios/filtro-registros.pipe';
import { FiltroRegistrosBusinessPipe } from './servicios/filtro-registros-business.pipe';
import { StaffService } from './servicios/staff.service';
import { FiltroStaffPipe } from './servicios/filtro-staff.pipe';
import { ParticipantesService } from './servicios/participantes.service';
import { EmpresaService } from './servicios/empresa.service';
import { ExcelService } from './servicios/excel.service';

import { ParticipantesComponent } from './participantes/participantes.component';
import { ParticipantesBusinessComponent } from './participantes-business/participantes-business.component';
import { ParticipantesFeriaIIComponent } from './participantes-feria-ii/participantes-feria-ii.component';
import { StandsComponent } from './stands/stands.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { RegistrosComponent } from './registros/registros.component';
import { EventosComponent } from './eventos/eventos.component';
import { RegistrosBusinessComponent } from './registros-business/registros-business.component';
import { RegistrosFeriaIIComponent } from './registros-feria-ii/registros-feria-ii.component';
import { PreguntaBusinessComponent } from './pregunta-business/pregunta-business.component';
import { FiltroEventosPipe } from './servicios/filtro-eventos.pipe';
import { StandsBusinessComponent } from './stands-business/stands-business.component';
import { FiltroStaffBusinessPipe } from './servicios/filtro-staff-business.pipe';
import { StandsFeriaIIComponent } from './stands-feria-ii/stands-feria-ii.component';


@NgModule({
  declarations: [
    RegistrosComponent,
    ParticipantesComponent,
    ParticipantesBusinessComponent,
    FiltroRegistrosPipe,
    FiltroStaffPipe,
    StandsComponent,
    ConfiguracionComponent,
    ResultadosComponent,
    PreguntaComponent,
    EventosComponent,
    RegistrosBusinessComponent,
    FiltroRegistrosBusinessPipe,
    RegistrosFeriaIIComponent,
    ParticipantesFeriaIIComponent,
    PreguntaBusinessComponent,
    FiltroEventosPipe,
    StandsBusinessComponent,
    FiltroStaffBusinessPipe,
    StandsFeriaIIComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AngularFirestoreModule,
    HttpClientModule,
    SharedModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    ChartsModule,
    NgxPaginationModule,
  ],
  providers: [
    AmChamService,
    StaffService,
    ParticipantesService,
    ExcelService,
    ConfigService,
    ResultadoService,
    EventoService,
    EmpresaService,
  ]
})
export class AdminModule { }
