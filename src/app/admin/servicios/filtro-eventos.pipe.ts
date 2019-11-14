import { Evento } from './../modelos/evento.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEventos'
})
export class FiltroEventosPipe implements PipeTransform {

  // Transforma un arreglo de logros en un arreglo de logros filtrado.
  transform(eventos: Evento[], busqueda: string, orden: string, asc: boolean): Evento[] {
    return eventos.filter( evento => {
      // normalize(NFD) es para quitar tildes.
      busqueda = busqueda.toLowerCase();
      // busqueda = busqueda.normalize('NFD').toLowerCase();
      for (const field in evento) {
        // if (typeof registro[field] === 'string' && registro[field].normalize('NFD').toLowerCase().includes(busqueda)) {
        if (typeof evento[field] === 'string' && evento[field].toLowerCase().includes(busqueda)) {
            return true;
        }
      }

      return false;
    }).sort((eventoA, eventoB) => {
        if (!orden) {
          orden = 'fecha';
        }

        const campoA = typeof eventoA[orden] === 'string' ? eventoA[orden].toLowerCase() : eventoA[orden];
        // const campoA = typeof registroA[orden] === 'string' ? registroA[orden].normalize('NFD').toLowerCase() : registroA[orden];
        const campoB = typeof eventoB[orden] === 'string' ? eventoB[orden].toLowerCase() : eventoB[orden];
        // const campoB = typeof registroB[orden] === 'string' ? registroB[orden].normalize('NFD').toLowerCase() : registroB[orden];

        if (asc) {
          return campoA > campoB ? 1 : -1;
        } else {
          return campoA > campoB ? -1 : 1;
        }
    });
  }
}
