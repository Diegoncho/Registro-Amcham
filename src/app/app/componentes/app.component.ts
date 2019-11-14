import { Component, OnInit } from '@angular/core';

import { AngularFireMessaging } from '@angular/fire/messaging';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class AppComponent implements OnInit {

  constructor(private messaging: AngularFireMessaging) {}

  ngOnInit() {
    // Suscribirse al messaging al cargar el menú (cuando el usuario ya esté logueado)
    this.messaging.messaging.subscribe((_messaging) => {

      // Agregar la Vapid key del proyecto de firebase.
      _messaging.usePublicVapidKey(environment.firebase_vapid);
    });
  }
}
