import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import localeSV from '@angular/common/locales/es-SV';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './componentes/app.component';

// Formularios
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


// Para firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Variables de entorno
import { environment } from '../../environments/environment';

// Servicios
import { AuthService } from './servicios/auth.service';
import { UsuariosSingletonService } from './servicios/usuarios-singleton.service';
import { EncuestaService } from '../catalogos/servicios/encuesta.service';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

// Pantallas
import { LoginComponent } from './pantallas/login/login.component';
import { MainComponent } from './componentes/main.component';
import { NavComponent } from './componentes/nav/nav.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { EliminadoComponent } from '../rifa/eliminado/eliminado.component';
import { RifaComponent } from '../rifa/rifa.component';
import { SorteoComponent } from '../rifa/sorteo/sorteo.component';
import { GanadorComponent } from '../rifa/ganador/ganador.component';
import { RifaService } from '../rifa/rifa.service';
import { GanadorIStrategiesComponent } from '../rifa/ganador-i-strategies/ganador-i-strategies.component';
import { SorteoIStrategiesComponent } from '../rifa/sorteo-i-strategies/sorteo-i-strategies.component';
import { GanadorDataRedComponent } from '../rifa/ganador-data-red/ganador-data-red.component';
import { SorteoDataRedComponent } from '../rifa/sorteo-data-red/sorteo-data-red.component';
import { FinalAmchamComponent } from '../rifa/final-amcham/final-amcham.component';


// Cambiando lenguaje de la app, para el calendario de ng-datepicker.
registerLocaleData(localeSV, 'es-SV');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavComponent,
    EliminadoComponent,
    RifaComponent,
    SorteoComponent,
    GanadorComponent,
    GanadorIStrategiesComponent,
    SorteoIStrategiesComponent,
    GanadorDataRedComponent,
    SorteoDataRedComponent,
    FinalAmchamComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    NgxBootstrapSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    AuthService,
    EncuestaService,
    RifaService,
    UsuariosSingletonService,
    // Cambiando lenguaje de la app, para el calendario de ng-datepicker.
    { provide: LOCALE_ID, useValue: 'es-SV' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule  { }
