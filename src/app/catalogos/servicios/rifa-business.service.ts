import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { BusinessDB } from '../../admin/modelos/businessdb.model';
import { Business } from '../../admin/modelos/business.model';

@Injectable({
  providedIn: 'root',
})
export class RifaBusinessService {

  constructor(
    private db: AngularFirestore,
  ) { }

  private participantes_sorteo: string[];

    getParticipantes(): Observable<Business[]> {
      return this.db.collection<BusinessDB>('registros-business').snapshotChanges().pipe(
          map(actions => actions.filter((a) => {
            if (a.payload.doc.data().asistio && a.payload.doc.data().es_miembro &&
            !a.payload.doc.data().es_eliminado) {
              return a.payload.doc.data();
            }
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
              es_miembro: _data.es_miembro,
              fecha: fecha,
              asistio: _data.asistio,
              fecha_asistio: asistio,
              es_eliminado: false,
            };

            return data;
          }))
      );
  }

  ganador(participante_business: Business): Promise<void>  {
    return this.db.collection('registros-business').doc(participante_business.key).update({gano: true});
  }

  setParticipantes(participantes_sorteo: string[]): void {
      this.participantes_sorteo = participantes_sorteo;
  }

  getParticipantesRifa(): string[] {
      return this.participantes_sorteo;
  }

}
