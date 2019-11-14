import { AngularFireMessaging } from '@angular/fire/messaging';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { StaffService } from '../servicios/staff.service';
import { AuthService } from 'src/app/app/servicios/auth.service';

import { Staff } from '../modelos/staff.model';

import { StaffBusiness } from '../modelos/staff-business.model';

declare var $: any;

@Component({
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.css']
})
export class StandsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  registros: Staff[];
  registros_visibles: Staff[];
  registro: Staff;

  registros_business: StaffBusiness[];
  registros_business_visibles: StaffBusiness[];
  registro_business: StaffBusiness;

  table = 'Business Networking';

  constructor(
    private service: StaffService,
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
