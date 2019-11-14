import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class RegistroDB {
    key: string;
    nombre: string;
    empresa: string;
    cargo: string;
    correo: string;
    telefono: string;
    es_miembro: boolean;
    editado: boolean;
    fecha: Timestamp;
    asistio: boolean;
    fecha_asistio: Timestamp;
    comio: boolean;
    fecha_comio: Timestamp;
    badge: string;
    es_eliminado: boolean;
}

