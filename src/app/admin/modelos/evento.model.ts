import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Evento {
  key: string;
  nombre: string;
  fecha: Date;
  es_eliminado: boolean;
}
