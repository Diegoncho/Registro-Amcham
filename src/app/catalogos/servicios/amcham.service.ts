import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { RegistroDB } from '../modelos/registrodb.model';
import { Registro } from '../modelos/registro.model';
import { BusinessDB } from './../modelos/businessdb.model';
import { Business } from './../modelos/business.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AmChamService {
    constructor(
        private db: AngularFirestore
    ) {}

    getRegistros(): Observable<Business[]> {
        return this.db.collection<BusinessDB>('registros-business').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const _data = a.payload.doc.data();
                const id = a.payload.doc.id;

                const data: Business = { key: id, ..._data };
                return data;
            }))
        );
    }
    // --------------------------------------------------------------------
    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    // Agregar un puesto, solo con su nombre.
    registrar(registro_business: BusinessDB):  Promise<void> {
        return this.validateEmail(registro_business.correo).then(() => {
            const id = this.db.createId();

            const doc = this.db.collection('registros-business').doc(id);
            return doc.set({...registro_business});
        });
    }

    validateEmail(email: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const sub = this.getRegistros().subscribe((registros) => {
                sub.unsubscribe();

                let duplicated = false;

                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].correo === email) {
                        duplicated = true;
                        i = registros.length;
                        reject({code: 'duplicated-email'});
                    }
                }

                if (!duplicated) {
                    resolve();
                }
            });
        });
    }
}
