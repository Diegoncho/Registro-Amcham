import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class StaffBusinessDB {
    key: string;
    nombre: string;
    empresa: string;
    correo: string;
    telefono: string;
    fecha: Timestamp;
    badge?: string;
}

