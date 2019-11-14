import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Business {
    key: string;
    nombre: string;
    empresa: string;
    cargo: string;
    correo: string;
    telefono: string;
    es_miembro?: boolean;
    fecha: Date;
    asistio?: boolean;
    fecha_asistio?: Date;
    es_eliminado: boolean;
}
