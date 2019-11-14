import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class EmpresaDB {
    key: string;
    nombre: string;
    fecha: Timestamp;
}

