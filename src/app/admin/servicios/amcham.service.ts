import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { RegistroDB } from '../modelos/registrodb.model';
import { Registro } from '../modelos/registro.model';
import { map } from 'rxjs/operators';

import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Business } from '../modelos/business.model';
import { BusinessDB } from '../modelos/businessdb.model';

@Injectable()
export class AmChamService {
    constructor(
        private db: AngularFirestore,
        private http: HttpClient
    ) {}

    getRegistros(): Observable<Registro[]> {
        return this.db.collection<RegistroDB>('registros', ref => ref.orderBy('fecha', 'desc')).snapshotChanges().pipe(
            map(actions => actions.filter((a) => {
                return !a.payload.doc.data().es_eliminado;
            }).map(a => {
                const _data = a.payload.doc.data();
                const id = a.payload.doc.id;

                const fecha = (_data.fecha as Timestamp).toDate();

                const data: Registro = {
                    key: id,
                    nombre: _data.nombre,
                    correo: _data.correo,
                    empresa: _data.empresa,
                    asistio: _data.asistio,
                    cargo: _data.cargo,
                    telefono: _data.telefono,
                    es_miembro: _data.es_miembro,
                    fecha: fecha,
                    editado: _data.key ? true : false,
                    seleccionado: false,
                    es_eliminado: false
                };

                return data;
            }))
        );
    }

    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

    actualizar(registro: Registro): Promise<void> {
        return this.db.collection('registros').doc(registro.key).update(registro);
    }

    enviarRegistro(registro: Registro): Observable<any> {
        return this.http.post(
            'https://us-central1-i-guest-test.cloudfunctions.net/EnviarRegistro',
            registro,
            { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
        );
    }

    enviarInformacionViaje(registro: Registro): Observable<any> {
        return this.http.post(
            'https://us-central1-i-guest-test.cloudfunctions.net/EnviarInformacionViaje',
            registro,
            { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
        );
    }

    enviarQR(registro: Registro): Observable<any> {
        return this.http.post(
            'https://us-central1-i-guest-test.cloudfunctions.net/EnviarCodigo',
            registro,
            { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
        );
    }

    eliminar(registro: Registro): Promise<void> {
        return this.db.collection('registros').doc(registro.key).update({es_eliminado: true});
    }

    arribo(key: string): Promise<void> {
        return this.db.collection('registros').doc(key).update({asistio: true, fecha_asistio: new Date()});
    }
    // --------------------------------------------------------------------
    // --------------------------------------------------------------------


    getRegistrosBusiness(): Observable<Business[]> {
      return this.db.collection<BusinessDB>('registros-business', ref => ref.orderBy('fecha', 'desc')).snapshotChanges().pipe(
        map(actions => actions.filter((a) => {
          return !a.payload.doc.data().es_eliminado;
        }).map(a => {
            const _data = a.payload.doc.data();
            const id = a.payload.doc.id;

            const fecha = (_data.fecha as Timestamp).toDate();

            const data: Business = {
              key: id,
              nombre: _data.nombre,
              correo: _data.correo,
              empresa: _data.empresa,
              cargo: _data.cargo,
              telefono: _data.telefono,
              es_miembro: _data.es_miembro,
              asistio: _data.asistio,
              fecha: fecha,
              es_eliminado: false,
            };

          return data;
        }))
      );
    }

    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

    actualizarBusiness(registro_business: Business): Promise<void> {
      return this.db.collection('registros-business').doc(registro_business.key).update(registro_business);
    }

    enviarRegistroBusiness(registro_business: Business): Observable<any> {
      return this.http.post(
          'https://us-central1-i-guest-test.cloudfunctions.net/EnviarRegistro',
          registro_business,
          { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
      );
    }


    enviarQRBusiness(registro_business: Business): Observable<any> {
      return this.http.post(
        'https://us-central1-i-guest-test.cloudfunctions.net/EnviarCodigo',
        registro_business,
        { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
      );
    }

    eliminarBusiness(registro_business: Business): Promise<void> {
      return this.db.collection('registros-business').doc(registro_business.key).update({es_eliminado: true});
    }

    arriboBusiness(key: string): Promise<void> {
      return this.db.collection('registros-business').doc(key).update({asistio: true, fecha_asistio: new Date()});
    }

    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

}
