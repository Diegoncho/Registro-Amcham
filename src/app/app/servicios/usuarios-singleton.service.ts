import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class UsuarioDB {
  nombre: string;
  puesto: string;
  rol: string;
  foto: string;
  fecha: number;
}

export class Usuario {
  key: string;
  nombre: string;
  cargo: string;
  rol: string;
  foto: string;
  fecha_nacimiento: Date;
}


@Injectable()
export class UsuariosSingletonService {
  usuarios = {};

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  // *************************************************************************************
  // *************************************************************************************
  // Obtener el perfil de un usuario a partir de su id.
  getUser(uid: string): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {

      // Si el usuario ya ha sido asignado, retornar.
      if (this.usuarios[uid]) {
          observer.next(this.usuarios[uid]);

      // Si el usuario no ha sido asignado, recuperar de la base.
      } else {
        // Obtener la información del usuario.
        const sub = this.db.object('/usuarios/' + uid).valueChanges().pipe(
          // Mapear el objeto de la base de datos.
          map((_usuario: UsuarioDB) => {
            const usuario = new Usuario;

            // Asignar campos.
            usuario.key = uid;
            usuario.nombre = _usuario.nombre;
            usuario.cargo = _usuario.puesto;
            usuario.rol = _usuario.rol;
            usuario.foto = _usuario.foto;
            usuario.fecha_nacimiento = new Date(_usuario.fecha);

            // Retornar usuario.
            return usuario;
          })
        ).subscribe( (user) => {

          // Asignar el usuario y retornarlo.
          this.usuarios[uid] = user;
          observer.next(this.usuarios[uid]);
          sub.unsubscribe();
        });
      }
    });
  }

  // *************************************************************************************
  // *************************************************************************************
  // Obtener el usuario actualmente logueado.
  getCurrentUser() {
    return this.auth.authState;
  }

  // *************************************************************************************
  // *************************************************************************************
  // Obtener el perfil del usuario actual.
  getCurrentProfile(): Observable<Usuario> {
    return new Observable<Usuario>( observer => {

      // Obtener usuario actual.
      const sub = this.getCurrentUser().subscribe( user => {
        // Obtener el perfil del usuario.
        this.getUser(user.uid).subscribe((usuario) => {
          // Retornar usuario.
          observer.next(usuario);
        });

        sub.unsubscribe();
      });
    });
  }
}
