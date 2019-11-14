import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class EventoDB {
  nombre: string;
  fecha: Timestamp;
  es_eliminado: boolean;
}
