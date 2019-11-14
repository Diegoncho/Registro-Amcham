import { AngularFireMessaging } from '@angular/fire/messaging';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ParticipantesService } from '../servicios/participantes.service';
import { AuthService } from 'src/app/app/servicios/auth.service';

import { Business } from '../modelos/business.model';
import { Registro } from '../modelos/registro.model';

declare var $: any;

@Component({
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit, OnDestroy {
  sub: Subscription;
  registros: Registro[];
  registros_visibles: Registro[];
  registro: Registro;

  registros_business: Business[];
  registros_business_visibles: Business[];
  registro_business: Business;

  table = 'Business Networking';

  constructor(
    private service: ParticipantesService,
    private auth: AuthService,
    private messaging: AngularFireMessaging,
  ) { }

  ngOnInit() {
    this.sub = this.service.getRegistros().subscribe((registros) => {
      this.registros = registros;
      this.registros_visibles = registros;
    });

    this.service.getRegistrosBusiness().subscribe((registros) => {
      this.registros_business = registros;
      this.registros_business_visibles = registros;
    });

    this.auth.getPermiso();

    this.messaging.messages.subscribe((payload) => {
      console.log('Message received. ', payload);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  evento(e) {
    this.table = e.target.value;
  }
}
