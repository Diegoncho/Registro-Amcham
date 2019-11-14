import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class StaffBusiness {
    key: string;
    nombre: string;
    empresa: string;
    correo: string;
    telefono: string;
    fecha: Date;
    badge?: string;
}
