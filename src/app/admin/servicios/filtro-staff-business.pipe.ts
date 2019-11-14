import { StaffBusiness } from '../modelos/staff-business.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroStaffBusiness'
})
export class FiltroStaffBusinessPipe implements PipeTransform {

  transform(registros: StaffBusiness[], busqueda_business: string, orden_business: string, asc_business: boolean): StaffBusiness[] {
    return registros.filter( registro => {
      // normalize(NFD) es para quitar tildes.
      busqueda_business = busqueda_business.toLowerCase();
      // busqueda = busqueda.normalize('NFD').toLowerCase();
      for (const field in registro) {
        // if (typeof registro[field] === 'string' && registro[field].normalize('NFD').toLowerCase().includes(busqueda)) {
        if (typeof registro[field] === 'string' && registro[field].toLowerCase().includes(busqueda_business)) {
            return true;
        }
      }

      return false;
    }).sort((registroA, registroB) => {
        if (!orden_business) {
          orden_business = 'fecha';
        }

        const campoA = typeof registroA[orden_business] === 'string' ? registroA[orden_business].toLowerCase() : registroA[orden_business];
        // const campoA = typeof registroA[orden] === 'string' ? registroA[orden].normalize('NFD').toLowerCase() : registroA[orden];
        const campoB = typeof registroB[orden_business] === 'string' ? registroB[orden_business].toLowerCase() : registroB[orden_business];
        // const campoB = typeof registroB[orden] === 'string' ? registroB[orden].normalize('NFD').toLowerCase() : registroB[orden];

        if (asc_business) {
          return campoA > campoB ? 1 : -1;
        } else {
          return campoA > campoB ? -1 : 1;
        }
    });
  }
}
