import { Pipe, PipeTransform } from '@angular/core';
import { Staff } from '../modelos/staff.model';

@Pipe({
  name: 'filtroStaff'
})
export class FiltroStaffPipe implements PipeTransform {

  // Transforma un arreglo de logros en un arreglo de logros filtrado.
  transform(registros: Staff[], busqueda: string, orden: string, asc: boolean): Staff[] {
    return registros.filter( registro => {
      // normalize(NFD) es para quitar tildes.
      busqueda = busqueda.toLowerCase();
      // busqueda = busqueda.normalize('NFD').toLowerCase();
      for (const field in registro) {
        // if (typeof registro[field] === 'string' && registro[field].normalize('NFD').toLowerCase().includes(busqueda)) {
        if (typeof registro[field] === 'string' && registro[field].toLowerCase().includes(busqueda)) {
            return true;
        }
      }

      return false;
    }).sort((registroA, registroB) => {
        if (!orden) {
          orden = 'empresa';
        }

        const campoA = typeof registroA[orden] === 'string' ? registroA[orden].toLowerCase() : registroA[orden];
        // const campoA = typeof registroA[orden] === 'string' ? registroA[orden].normalize('NFD').toLowerCase() : registroA[orden];
        const campoB = typeof registroB[orden] === 'string' ? registroB[orden].toLowerCase() : registroB[orden];
        // const campoB = typeof registroB[orden] === 'string' ? registroB[orden].normalize('NFD').toLowerCase() : registroB[orden];

        if (asc) {
          return campoA > campoB ? 1 : -1;
        } else {
          return campoA > campoB ? -1 : 1;
        }
    });
  }
}
