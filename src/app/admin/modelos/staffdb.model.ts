import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class StaffDB {
    key: string;
    nombre: string;
    empresa: string;
    fecha: Timestamp;
    comio?: boolean;
    fecha_comio?: Timestamp;
    badge?: string;
}
