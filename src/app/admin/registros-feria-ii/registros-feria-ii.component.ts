import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ExcelService } from './../servicios/excel.service';
import { AmChamService } from '../servicios/amcham.service';

import { Registro } from '../modelos/registro.model';

declare var $: any;

@Component({
  selector: 'app-registros-feria-ii',
  templateUrl: './registros-feria-ii.component.html',
  styleUrls: ['./registros-feria-ii.component.css']
})
export class RegistrosFeriaIIComponent implements OnInit {
  @Input() Data = [];
  @Input() DataVisible = [];

  registro: Registro;

  busqueda = '';
  orden: string;
  asc = false;

  solicitudForm: FormGroup;

  form_message: string;
  show_form_message = false;
  show_error_message = false;
  actualizando = false;
  opciones_masivas = false;

  PageItems = 10;

  constructor(
    private service: AmChamService,
    private excel: ExcelService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() { }

  get f_nombre() { return this.solicitudForm.get('nombre'); }
  get f_empresa() { return this.solicitudForm.get('empresa'); }
  get f_cargo() { return this.solicitudForm.get('cargo'); }
  get f_correo() { return this.solicitudForm.get('correo'); }
  get f_telefono() { return this.solicitudForm.get('telefono'); }
  get f_es_miembro() { return this.solicitudForm.get('es_miembro'); }

  selectRegistro(registro: Registro) {
    this.registro = registro;

    this.solicitudForm = this.fb.group({
      nombre: [this.registro.nombre, Validators.required],
      empresa: [this.registro.empresa, Validators.required],
      cargo: [this.registro.cargo, Validators.required],
      correo: [this.registro.correo, [Validators.required, Validators.email]],
      telefono: [this.registro.telefono, Validators.required],
      es_miembro: [this.registro.es_miembro.toString(), Validators.required]
    });

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

      const registro = this.registro;
      registro.nombre = _solicitud['nombre'];
      registro.empresa = _solicitud['empresa'];
      registro.cargo = _solicitud['cargo'];
      registro.correo = _solicitud['correo'];
      registro.es_miembro = _solicitud['es_miembro'] === 'true' ? true : false;
      registro.telefono = _solicitud['telefono'];
      registro.asistio = false;
      registro.es_eliminado = false;

      this.service.actualizar(registro).then(() => {
        this.form_message = 'Registrado!';
        $('.modal').modal('hide');
      }).catch((err) => {
        this.actualizando = false;
        if (err['code'] === 'duplicated-email') {
          this.form_message = 'El correo ingresado ya ha sido registrado';
        } else {
          this.form_message = 'Ha habido un problema al registrarse, por favor intentele en unos minutos';
        }
      });
    } else {
      this.form_message = 'Por favor corregir los errores mostrados en el formulario';
      this.show_error_message = true;
    }
  }

  exportarExcel(): void {
    this.excel.exportAsExcelFile(this.DataVisible.map((registro) => {
      return {
        'Empresa': registro.empresa,
        'Nombre': registro.nombre,
        'Cargo': registro.cargo,
        'Correo': registro.correo,
        'Teléfono empresa': registro.telefono.split(', ')[0],
        'Teléfono móvil': registro.telefono.split(', ')[1] ? registro.telefono.split(', ')[1] : '',
        'Miembro': registro.es_miembro ? 'Sí' : 'No'
      };
    }), 'RegistrosFeriaTecnologia');
  }

  enviarRegistro() {
    this.show_form_message = true;
    this.form_message = 'Enviando...';
    this.service.enviarRegistro(this.registro).subscribe(() => {
      $('.modal').modal('hide');
    });
  }

  enviarInfo() {
    this.show_form_message = true;
    this.form_message = 'Enviando...';
    this.service.enviarInformacionViaje(this.registro).subscribe(() => {
      $('.modal').modal('hide');
    });
  }

  enviarQR() {
    this.show_form_message = true;
    this.form_message = 'Enviando...';
    this.service.enviarQR(this.registro).subscribe(() => {
      $('.modal').modal('hide');
    });
  }

  eliminar() {
    const registro = this.registro;

    registro.es_eliminado = true;

    this.service.eliminar(registro).then(() => {
      $('.modal').modal('hide');
    });
  }

  arribo(registro: Registro) {
    if (registro.asistio === true) {
      $('#modal_arribo').modal('show');
    } else {
      this.service.arribo(registro.key).then(() => {
        this.router.navigate(['/AmChamAdmin/asistentes']);
        $('#modal_arribo').modal('hide');
      });
    }
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
