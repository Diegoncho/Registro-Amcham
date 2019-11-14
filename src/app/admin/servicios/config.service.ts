import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ConfigDB } from '../modelos/configdb.model';

@Injectable()
export class ConfigService {
  constructor(
    private db: AngularFirestore
  ) {}

  // -----------------------------------------------------
    // Creando registros de configuracion.
    registrar(config: ConfigDB): Promise<void> {
      const id = this.db.createId();

      const doc = this.db.collection('config').doc(id);

      return doc.set({...config});
  }
}
