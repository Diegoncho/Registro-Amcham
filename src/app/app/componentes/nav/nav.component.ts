import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  items = [
  ];

  es_admin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messaging: AngularFireMessaging,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Registrar el sitio para notificaciones push.

    this.messaging.messages.subscribe((payload) => {
      console.log('Message received. ', payload);
    });

    this.es_admin = this.router.url.includes('AmChamAdmin');

    // this.authService.getPermiso();
  }

  logout() {
    this.authService.doLogout().pipe(
      finalize( () => {
        this.router.navigate(['']);
      })
    ).subscribe();
  }

}
