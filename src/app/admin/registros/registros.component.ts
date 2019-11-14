import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { Subscription } from 'rxjs';

import { AmChamService } from '../servicios/amcham.service';
import { AuthService } from 'src/app/app/servicios/auth.service';

import { Registro } from '../modelos/registro.model';
import { Business } from '../modelos/business.model';

@Component({
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit, OnDestroy {
  sub: Subscription;
  registros: Registro[];
  registros_visibles: Registro[];
  registro: Registro;

  registros_business: Business[];
  registros_business_visibles: Business[];
  registro_business: Business;

  table = 'Business Networking';

  constructor(
    private service: AmChamService,
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
