import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { EncuestaBusinessDB } from './../modelos/encuesta-businessdb.model';
import { EncuestaDB } from '../modelos/encuestadb.model';

@Injectable()
export class EncuestaService {
    constructor(
      private db: AngularFirestore
    ) {}

    // -----------------------------------------------------
    // Creando registros de encuesta
    registrar(encuesta_business: EncuestaBusinessDB): Promise<void> {
        const id = this.db.createId();

        const doc = this.db.collection('encuestas-business').doc(id);

        return doc.set({...encuesta_business});
    }
}
