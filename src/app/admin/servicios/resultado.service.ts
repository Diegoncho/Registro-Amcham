import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Resultado } from '../modelos/resultado.model';
import { EncuestaDB } from '../../catalogos/modelos/encuestadb.model';
import { EncuestaBusiness } from './../../catalogos/modelos/encuesta-business.model';
import { EncuestaBusinessDB } from './../../catalogos/modelos/encuesta-businessdb.model';
import { Encuesta } from '../../catalogos/modelos/encuesta.model';
import { map } from 'rxjs/operators';

import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable()
export class ResultadoService {

  constructor(
    private db: AngularFirestore
  ) { }


  getResultados(): Observable<Resultado> {
    return this.db.collection<EncuestaDB>('encuestas').snapshotChanges().pipe(
      map(actions => {
        const resultado = new Resultado();
        for (let i = 0; i < actions.length; i++) {
          const data = actions[i].payload.doc.data();
          resultado.pregunta_1[Number.parseInt(data.pregunta_1, 10) - 1]++;
          resultado.pregunta_2[Number.parseInt(data.pregunta_2, 10) - 1]++;
          resultado.pregunta_3[Number.parseInt(data.pregunta_3, 10) - 1]++;
          resultado.pregunta_4[Number.parseInt(data.pregunta_4, 10) - 1]++;
          resultado.pregunta_5[Number.parseInt(data.pregunta_5, 10) - 1]++;
        }
        return resultado;
      })
    );
  }

  getEncuestas(): Observable<Encuesta[]> {
    return this.db.collection<EncuestaDB>('encuestas').snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const _data = a.payload.doc.data();
            const id = a.payload.doc.id;

            const data: Encuesta = {
                key: id,
                pregunta_1: _data.pregunta_1,
                pregunta_2: _data.pregunta_2,
                pregunta_3: _data.pregunta_3,
                pregunta_4: _data.pregunta_4,
                pregunta_5: _data.pregunta_5,
                pregunta_6: _data.pregunta_6,
                fecha: _data.fecha
            };

            return data;
        }))
    );
  }

  getEncuestasBusiness(): Observable<EncuestaBusiness[]> {
    return this.db.collection<EncuestaBusinessDB>('encuestas-business', ref => ref.orderBy('pregunta_4', 'desc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const _data = a.payload.doc.data();
            const id = a.payload.doc.id;

            const data: EncuestaBusiness = {
                key: id,
                pregunta_1: _data.pregunta_1,
                pregunta_2: _data.pregunta_2,
                pregunta_3: _data.pregunta_3,
                pregunta_4: _data.pregunta_4,
                pregunta_5: _data.pregunta_5,
                pregunta_6: _data.pregunta_6,
                pregunta_7: _data.pregunta_7,
                pregunta_8: _data.pregunta_8,
                pregunta_9: _data.pregunta_9,
                pregunta_10: _data.pregunta_10,
                pregunta_11: _data.pregunta_11,
                fecha: _data.fecha
            };

            return data;
        }))
    );
  }
}
