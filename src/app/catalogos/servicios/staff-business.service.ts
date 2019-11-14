import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { StaffBusinessDB } from './../modelos/staff-businessdb.model';
import { StaffBusiness } from './../modelos/staff-business.model';
import { map } from 'rxjs/operators';

@Injectable()
export class StaffBusinessService {

  constructor(
    private db: AngularFirestore,
  ) {}

  getRegistros(): Observable<StaffBusiness[]> {
      return this.db.collection<StaffBusinessDB>('staff-business').snapshotChanges().pipe(
          map(actions => actions.map(a => {
              const _data = a.payload.doc.data();
              const id = a.payload.doc.id;

              const data: StaffBusiness = { key: id, ..._data };
              return data;
          }))
      );
  }

  registrar(staff_business: StaffBusinessDB):  Promise<void> {
      return this.validateEmail(staff_business.correo).then(() => {
          const id = this.db.createId();

          const doc = this.db.collection('staff-business').doc(id);
          return doc.set({...staff_business});
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
