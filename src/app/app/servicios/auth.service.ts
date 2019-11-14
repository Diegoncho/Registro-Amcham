import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { Observable } from 'rxjs';
import { mergeMapTo } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  // Almacenar el token y el uid.
  token: string;
  uid: string;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private messaging: AngularFireMessaging,
    private http: HttpClient
  ) { }

  // *************************************************************************************
  // *************************************************************************************
  // Intentar loguearse.
  doLogin(value) {
    return new Observable((observer) => {

      // Recuperar los datos del usuario.
      this.auth.auth.signInWithEmailAndPassword(value.email, value.password).then(res => {
        // Almacenar el uid en la instancia del servicio.
        this.uid = res.user.uid;

        // Verificar si es admin.
        // this.checkAdmin(this.uid).subscribe( (logged) => {
        //   // Si es admin, autorizar.
        //   if (logged) {
            observer.next();
            observer.complete();

          // Si no es admin, mandar error.
          // } else {
          //   observer.error({code: '403'});
          //   observer.complete();
          // }
        // });
      }, err => { observer.error(err); });
    });
  }

  // *************************************************************************************
  // *************************************************************************************
  // Obtener permiso o al actualizar token.
  getPermiso() {
    // Solicitar permiso.
    const sub = this.messaging.requestPermission.pipe(
      // Hacer el merge map con la actualización del token.
      mergeMapTo(this.messaging.tokenChanges)
    ).subscribe((token) => {
        this.token = token;

        // Almacenar el token en la base de datos.
        if (this.uid) {
          this.registerToken(this.uid, this.token);
        }
        sub.unsubscribe();
    });
  }

  registerToken(uid: string, token: string) {
    this.http.post(
      'https://us-central1-i-guest-test.cloudfunctions.net/RegistrarToken',
      {uid: uid, token: token},
      { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}).subscribe();
  }

  deleteToken(uid: string, token: string) {
    this.http.post(
      'https://us-central1-i-guest-test.cloudfunctions.net/EliminarToken',
      {uid: uid, token: token},
      { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}).subscribe();
  }

  // *************************************************************************************
  // *************************************************************************************
  // Cerrar sesión.
  doLogout() {
    return new Observable((observer) => {

      // Eliminar el nodo de la base de datos.
      // this.db.object('tokens/' + this.uid + '/' + this.token).remove().then(() => {

        // Cerrar sesión.
        this.deleteToken(this.uid, this.token);
        this.auth.auth.signOut();
        observer.complete();
      // });
    });
  }

  // *************************************************************************************
  // *************************************************************************************
  // Verificar si un usuario es administrador.
  // checkAdmin(uid: string) {
  //   return new Observable( (observer) => {

  //     // Obtener la información del usuario.
  //     const sub = this.db.object('usuarios/' + uid).valueChanges().subscribe( (user) => {
  //       sub.unsubscribe();

  //       // Verificar que el usuario esté activo y sea administrador.
  //       if (user['activo'] && user['rol'] === 'Administrador') {
  //         observer.next(true);
  //         observer.complete();
  //       } else {
  //         observer.next(false);
  //         observer.complete();
  //       }
  //     });
  //   });
  // }

  // *************************************************************************************
  // *************************************************************************************
  // Verificar si el usuario está logueado y es admin.
  isLogged() {
    return new Observable( (observer) => {

      const sub = this.auth.authState.subscribe( (user) => {
        if (!user) {
          // Si no está logueado, retornar falso.
          observer.next(false);
          observer.complete();
        } else {
          this.uid = user.uid;

          // Si está logueado, retornar si es admin.
          // this.checkAdmin(user.uid).subscribe((logged) => {
          //   observer.next(logged);
          //   observer.complete();
          // });
          observer.next(true);
          observer.complete();
        }
        sub.unsubscribe();
      });
    });
  }

  userUid() {
   return this.auth.authState.subscribe((user) => {
     this.uid = user.uid;
    });
  }
}
