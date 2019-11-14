import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StaffDB } from '../modelos/staffdb.model';
import { Staff } from '../modelos/staff.model';

import { StaffBusinessDB } from '../modelos/staff-businessdb.model';
import { StaffBusiness } from '../modelos/staff-business.model';


@Injectable()
export class StaffService {
    constructor(
        private db: AngularFirestore,
        private http: HttpClient
    ) {}

    getRegistros(): Observable<Staff[]> {
        return this.db.collection<StaffDB>('staff').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const _data = a.payload.doc.data();
                const id = a.payload.doc.id;
                const comio = _data.fecha_comio ? (_data.fecha_comio as Timestamp).toDate() : null;

                const data: Staff = {
                    key: id,
                    nombre: _data.nombre,
                    empresa: _data.empresa,
                    fecha: new Date(),
                    comio: _data.comio || false,
                    fecha_comio: comio,
                    badge: _data.badge
                };

                return data;
            }))
        );
    }

    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

    actualizar(registro: StaffDB): Promise<void> {
        return this.db.collection('staff').doc(registro.key).update(registro);
    }

    crear(registro: StaffDB): Promise<any> {
        return this.http.post(
            'https://us-central1-i-guest-test.cloudfunctions.net/CrearBadgeRegistroStaff',
            registro,
            { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
        ).toPromise<any>();
    }

    comio(key: string): Promise<void> {
        return this.db.collection('staff').doc(key).update({comio: true, fecha_comio: new Date()});
    }

    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

    getRegistrosBusiness(): Observable<StaffBusiness[]> {
        return this.db.collection<StaffBusinessDB>('staff-business').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const _data = a.payload.doc.data();
                const id = a.payload.doc.id;

                const data: StaffBusiness = {
                    key: id,
                    nombre: _data.nombre,
                    empresa: _data.empresa,
                    correo: _data.correo,
                    telefono: _data.telefono,
                    fecha: new Date(),
                    badge: _data.badge
                };

                return data;
            }))
        );
    }

    crearStaff(staff_business: StaffBusiness): Promise<void> {
      const id = this.db.createId();

      const doc = this.db.collection('staff-business').doc(id);

      return doc.set({...staff_business});
    }

    enviarQRBusiness(staff_business: StaffBusiness): Observable<any> {
      return this.http.post(
          'https://us-central1-i-guest-test.cloudfunctions.net/EnviarCodigoStand',
          staff_business,
          { headers: new HttpHeaders( {'Content-Type':  'application/json'} )}
      );
    }
}
