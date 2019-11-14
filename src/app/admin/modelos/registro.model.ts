export class Registro {
    key: string;
    nombre: string;
    empresa: string;
    cargo: string;
    correo: string;
    telefono: string;
    fecha: Date;
    editado: boolean;
    es_miembro?: boolean;
    asistio?: boolean;
    fecha_asistio?: Date;
    comio?: boolean;
    fecha_comio?: Date;
    badge?: string;
    seleccionado: boolean;
    es_eliminado: boolean;
}
