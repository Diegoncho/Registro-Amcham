import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { EmpresaDB } from './../modelos/empresadb.model';
import { Empresa } from '../modelos/empresa.model';
import { map } from 'rxjs/operators';

import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;


@Injectable()
export class EmpresaService {

  constructor(
    private db: AngularFirestore,
  ) { }

  getEmpresas(): Observable<Empresa[]> {
    return this.db.collection<EmpresaDB>('empresas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const _data = a.payload.doc.data();
        const id = a.payload.doc.id;

        const fecha = (_data.fecha as Timestamp).toDate();

        const data: Empresa = {
            key: id,
            nombre: _data.nombre,
            fecha: fecha,
        };

        return data;
      }))
    );
  }

}
