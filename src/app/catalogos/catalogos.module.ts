import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CatalogosRoutingModule } from './catalogos-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AmChamService } from './servicios/amcham.service';
import { EmpresaService } from './../admin/servicios/empresa.service';
import { StaffService } from './../admin/servicios/staff.service';
import { StaffBusinessService } from './servicios/staff-business.service';

import { RegistroAmChamComponent } from './amcham/registro-am-cham.component';
import { DoneComponent } from './done/done.component';
import { EncuestaAmChamComponent } from './encuesta/encuesta-am-cham.component';
import { DoneEncuestaComponent } from './done-encuesta/done-encuesta.component';
import { RifaBusinessComponent } from './rifa-business/rifa-business.component';
import { SorteoBusinessComponent } from './rifa-business/sorteo-business/sorteo-business.component';
import { GanadorBusinessComponent } from './rifa-business/ganador-business/ganador-business.component';
import { FinalBusinessComponent } from './rifa-business/final-business/final-business.component';
import { StandsBusinessComponent } from './stands-business/stands-business.component';
import { DoneStandComponent } from './done-stand/done-stand.component';


@NgModule({
  declarations: [
    RegistroAmChamComponent,
    DoneComponent,
    EncuestaAmChamComponent,
    DoneEncuestaComponent,
    RifaBusinessComponent,
    SorteoBusinessComponent,
    GanadorBusinessComponent,
    FinalBusinessComponent,
    StandsBusinessComponent,
    DoneStandComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogosRoutingModule,
    AngularFirestoreModule,
    NgxBootstrapSliderModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    SharedModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [
    AmChamService,
    EmpresaService,
    StaffService,
    StaffBusinessService,
  ]
})
export class CatalogosModule { }
