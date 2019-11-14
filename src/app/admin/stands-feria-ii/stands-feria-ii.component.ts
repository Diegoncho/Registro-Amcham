import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { StaffService } from '../servicios/staff.service';

import { Staff } from '../modelos/staff.model';
import { StaffDB } from './../modelos/staffdb.model';

declare var $: any;

@Component({
  selector: 'app-stands-feria-ii',
  templateUrl: './stands-feria-ii.component.html',
  styleUrls: ['./stands-feria-ii.component.css']
})
export class StandsFeriaIIComponent implements OnInit {
  @Input() Data = [];
  @Input() DataVisible = [];

  registro: Staff;

  busqueda = '';
  orden: string;
  asc = false;

  solicitudForm: FormGroup;

  form_message: string;
  show_form_message = false;
  show_error_message = false;
  actualizando = false;
  creando = false;

  PageItems = 10;

  constructor(
    private service: StaffService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() { }

  get f_nombre() { return this.solicitudForm.get('nombre'); }
  get f_empresa() { return this.solicitudForm.get('empresa'); }

  selectRegistro(registro: Staff) {
    this.registro = registro;

    this.solicitudForm = this.fb.group({
      nombre: [this.registro ? this.registro.nombre : '', Validators.required],
      empresa: [this.registro ? this.registro.empresa : '', Validators.required],
    });

    if (!registro) { this.creando = true; }

    this.actualizando = false;
    this.show_form_message = false;
    this.form_message = '';
  }

  actualizar() {
    if (this.solicitudForm.valid) {
      const _solicitud = this.solicitudForm.value;

      // Mostrar mensajes.
      this.show_form_message = true;
      this.actualizando = true;
      this.form_message = 'Registrando...';

      const registro = new StaffDB();
      registro.key = this.registro ? this.registro.key : '';
      registro.nombre = _solicitud['nombre'];
      registro.empresa = _solicitud['empresa'];

      const promise = registro.key ? this.service.actualizar(registro) : this.service.crear(registro);

      promise.then(() => {
        this.form_message = 'Guardado!';
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

  comio(registro) {
    if (registro.comio) {
      $('#modal_comio').modal('show');
    } else {
      this.service.comio(registro.key);
    }
  }

  imprimir() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  ordenar(field: string): void {
    if (this.orden === field) {
      this.asc = !this.asc;
    } else {
      this.asc = true;
      this.orden = field;
    }
  }

  pageLenght(e) {
    this.PageItems = e.target.value;
  }

}
