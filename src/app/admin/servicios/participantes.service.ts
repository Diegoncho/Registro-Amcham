import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessDB } from './../modelos/businessdb.model';
import { Business } from '../modelos/business.model';

import { RegistroDB } from '../modelos/registrodb.model';
import { Registro } from '../modelos/registro.model';

@Injectable()
export class ParticipantesService {
    constructor(
        private db: AngularFirestore,
        private http: HttpClient
    ) {}

    getRegistros(): Observable<Registro[]> {
        return this.db.collection<RegistroDB>('registros', ref => ref.orderBy('fecha_asistio', 'desc')).snapshotChanges().pipe(
            map(actions => actions.filter((a) => {
                return !a.payload.doc.data().es_eliminado;
            }).map(a => {
                const _data = a.payload.doc.data();
                const id = a.payload.doc.id;
                const fecha = (_data.fecha as Timestamp).toDate();
                const asistio = (_data.fecha_asistio as Timestamp).toDate();
                const comio = _data.fecha_comio ? (_data.fecha_comio as Timestamp).toDate() : null;

                const data: Registro = {
                    key: id,
                    nombre: _data.nombre,
                    correo: _data.correo,
                    empresa: _data.empresa,
                    cargo: _data.cargo,
                    telefono: _data.telefono,
                    fecha: fecha,
                    editado: _data.editado,
                    seleccionado: false,
                    asistio: _data.asistio,
                    fecha_asistio: asistio,
                    comio: _data.comio || false,
                    fecha_comio: comio,
                    badge: _data.badge,
                    es_eliminado: false,
                };

                return data;
            }))
        );
    }

    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

    actualizar(registro: RegistroDB): Promise<void> {
        return this.db.collection('registros').doc(registro.key).update(registro);
    }

    crear(registro: RegistroDB): Promise<any> {
        return this.http.post(
            'https://us-central1-i-guest-test.cloudfunctions.net/CrearBadgeRegistro',
            registro,
            { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
        ).toPromise<any>();
    }

    comio(key: string): Promise<void> {
        return this.db.collection('registros').doc(key).update({comio: true, fecha_comio: new Date()});
    }

    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

    getRegistrosBusiness(): Observable<Business[]> {
        return this.db.collection<BusinessDB>('registros-business', ref => ref.orderBy('fecha_asistio', 'desc')).snapshotChanges().pipe(
            map(actions => actions.filter((a) => {
                return !a.payload.doc.data().es_eliminado;
            }).map(a => {
              const _data = a.payload.doc.data();
              const id = a.payload.doc.id;
              const fecha = (_data.fecha as Timestamp).toDate();
              const asistio = (_data.fecha_asistio as Timestamp).toDate();

              const data: Business = {
                key: id,
                nombre: _data.nombre,
                correo: _data.correo,
                empresa: _data.empresa,
                cargo: _data.cargo,
                telefono: _data.telefono,
                fecha: fecha,
                asistio: _data.asistio,
                fecha_asistio: asistio,
                es_eliminado: false,
              };

              return data;
            }))
        );
    }
}
