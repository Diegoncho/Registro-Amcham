import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ParticipantesService } from './../servicios/participantes.service';
import { ExcelService } from './../servicios/excel.service';
import { RifaService } from 'src/app/rifa/rifa.service';

import { Registro } from './../modelos/registro.model';
import { RegistroDB } from './../modelos/registrodb.model';

declare var $: any;

@Component({
  selector: 'app-participantes-feria-ii',
  templateUrl: './participantes-feria-ii.component.html',
  styleUrls: ['./participantes-feria-ii.component.css']
})
export class ParticipantesFeriaIIComponent implements OnInit {
  @Input() Data = [];
  @Input() DataVisible = [];

  registro: Registro;
  creando = false;

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
    private service: ParticipantesService,
    private excel: ExcelService,
    private fb: FormBuilder,
    private rifaService: RifaService,
    private router: Router
  ) { }

  ngOnInit() { }

  get f_nombre() { return this.solicitudForm.get('nombre'); }
  get f_empresa() { return this.solicitudForm.get('empresa'); }
  get f_cargo() { return this.solicitudForm.get('cargo'); }
  get f_correo() { return this.solicitudForm.get('correo'); }
  get f_telefono() { return this.solicitudForm.get('telefono'); }

  selectRegistro(registro: Registro) {
    this.registro = registro;

    this.solicitudForm = this.fb.group({
      nombre: [this.registro ? this.registro.nombre : '', Validators.required],
      empresa: [this.registro ? this.registro.empresa : '', Validators.required],
      cargo: [this.registro ? this.registro.cargo : '', Validators.required],
      correo: [this.registro ? this.registro.correo : '', [Validators.required, Validators.email]],
      telefono: [this.registro ? this.registro.telefono : '', Validators.required]
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

      const registro = new RegistroDB();
      registro.key = this.registro ? this.registro.key : '';
      registro.nombre = _solicitud['nombre'];
      registro.empresa = _solicitud['empresa'];
      registro.cargo = _solicitud['cargo'];
      registro.correo = _solicitud['correo'];
      registro.telefono = _solicitud['telefono'];
      registro.es_miembro = true;

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

  goToRifa() {
    this.rifaService.setParticipantes(this.Data.map((registro) => registro.nombre));

    this.router.navigate(['/rifa']);
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

  exportarExcel(): void {
    this.excel.exportAsExcelFile(this.DataVisible.map((registro) => {
      return {
        'Empresa': registro.empresa,
        'Nombre': registro.nombre,
        'Cargo': registro.cargo,
        'Correo': registro.correo,
        'Teléfono empresa': registro.telefono.split(', ')[0],
        'Teléfono móvil': registro.telefono.split(', ')[1] ? registro.telefono.split(', ')[1] : ''
      };
    }), 'AsistentesFeriaTecnologia');
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
