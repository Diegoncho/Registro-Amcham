import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ExcelService } from './../servicios/excel.service';
import { EventoService } from './../servicios/evento.service';

import { Evento } from './../modelos/evento.model';

declare var $: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  evento: Evento;
  eventos: Evento[];
  registros_visibles: Evento[];

  busqueda = '';
  orden: string;
  asc = false;

  solicitudForm: FormGroup;

  form_message: string;
  show_form_message = false;
  show_error_message = false;
  actualizando = false;

  PageItems = 10;

  constructor(
    private service: EventoService,
    private excel: ExcelService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.service.getEventos().subscribe((eventos) => {
      this.eventos = eventos;
      this.registros_visibles = eventos;
    });

    this.solicitudForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  get f_nombre() { return this.solicitudForm.get('nombre'); }

  selectPlus() {
    this.solicitudForm = this.fb.group({
      nombre: ['', Validators.required],
    });

    this.actualizando = false;
    this.show_form_message = false;
    this.form_message = '';
  }

  selectEvento(evento: Evento) {
    this.evento = evento;

    this.solicitudForm = this.fb.group({
      nombre: [this.evento.nombre, Validators.required],
    });

    this.actualizando = false;
    this.show_form_message = false;
    this.form_message = '';
  }

  crear() {
    if (this.solicitudForm.valid) {
      const _solicitud = this.solicitudForm.value;

      this.show_form_message = true;
      this.form_message = 'Creando...';

      const evento = new Evento();

      evento.nombre = _solicitud['nombre'];
      evento.fecha = new Date();

      this.service.crearEvento(evento).then(() => {
        this.form_message = '¡Registrado!';
        this.solicitudForm.reset();
        $('.modal').modal('hide');
      }).catch(() => {
        this.form_message = 'Ha habido un problema al registrarse, por favor intentele en unos minutos';
      });
    } else {
      this.form_message = 'Por favor corregir los errores mostrados en el formulario';
      this.show_error_message = true;
    }
  }

  actualizar() {
    if (this.solicitudForm.valid) {
      const _solicitud = this.solicitudForm.value;

      // Mostrar mensajes.
      this.show_form_message = true;
      this.actualizando = true;
      this.form_message = 'Actualizando...';

      const evento = this.evento;

      evento.nombre = _solicitud['nombre'];
      evento.es_eliminado = false;

      this.service.actualizarEvento(evento).then(() => {
        this.form_message = '¡Actualizado!';
        $('.modal').modal('hide');
      }).catch(() => {
        this.actualizando = false;
        this.form_message = 'Ha habido un problema al registrarse, por favor intentele en unos minutos';
      });
    } else {
      this.form_message = 'Por favor corregir los errores mostrados en el formulario';
      this.show_error_message = true;
    }
  }

  exportarExcel() {
    this.excel.exportAsExcelFile(this.registros_visibles.map((registro, index) => {
      return {
        '#': index + 1,
        'Evento': registro.nombre,
        'Fecha': registro.fecha,
      };
    }), 'Eventos');
  }

  eliminar() {
    const evento = this.evento;

    evento.es_eliminado = true;

    this.service.eliminarEvento(evento).then(() => {
      $('.modal').modal('hide');
    });
  }

  pageLenght(e) {
    this.PageItems = e.target.value;
  }

}
