import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class ConfigDB {
    key: string;
    ip:  string;
    mac: string;
    wifi: boolean;
}
