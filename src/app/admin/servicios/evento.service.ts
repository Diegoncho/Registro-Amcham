import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventoDB } from './../modelos/eventodb.model';
import { Evento } from './../modelos/evento.model';

import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable()
export class EventoService {

  constructor(
    private db: AngularFirestore
  ) { }

  getEventos(): Observable<Evento[]> {
    return this.db.collection<EventoDB>('eventos').snapshotChanges().pipe(
      map(actions => actions.filter((a) => {
        return !a.payload.doc.data().es_eliminado;
      }).map(a => {
        const _data = a.payload.doc.data();
        const id = a.payload.doc.id;

        const fecha = (_data.fecha as Timestamp).toDate();

        const data: Evento = {
            key: id,
            nombre: _data.nombre,
            fecha: fecha,
            es_eliminado: false,
        };

        return data;
        }))
      );
    }

  crearEvento(evento: Evento): Promise<void> {
    const id = this.db.createId();

    const doc = this.db.collection('eventos').doc(id);

    return doc.set({...evento});
  }

  actualizarEvento(evento: Evento): Promise<void> {
    return this.db.collection('eventos').doc(evento.key).update(evento);
  }

  eliminarEvento(evento: Evento): Promise<void> {
    return this.db.collection('eventos').doc(evento.key).update({es_eliminado: true});
  }
}
