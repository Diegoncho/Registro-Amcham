import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Empresa {
    key: string;
    nombre: string;
    fecha: Date;
}
