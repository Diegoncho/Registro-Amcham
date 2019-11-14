import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class BusinessDB {
    key: string;
    nombre: string;
    empresa: string;
    cargo: string;
    correo: string;
    telefono: string;
    es_miembro: boolean;
    fecha: Timestamp;
    asistio?: boolean;
    fecha_asistio?: Timestamp;
    es_eliminado: boolean;
}

