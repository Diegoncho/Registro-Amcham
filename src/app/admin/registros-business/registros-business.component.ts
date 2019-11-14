import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ExcelService } from './../servicios/excel.service';
import { AmChamService } from './../servicios/amcham.service';

import { Business } from './../modelos/business.model';

declare var $: any;

@Component({
  selector: 'app-registros-business',
  templateUrl: './registros-business.component.html',
  styleUrls: ['./registros-business.component.css'],
})
export class RegistrosBusinessComponent implements OnInit {
  @Input() Data = [];
  @Input() DataVisible = [];

  registro_business: Business;

  busqueda_business = '';
  orden_business: string;
  asc_business = false;

  solicitudForm: FormGroup;

  form_message: string;
  show_form_message = true;
  show_error_message = false;
  actualizando = false;

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

  selectRegistro(registro_business: Business) {
    this.registro_business = registro_business;

    this.solicitudForm = this.fb.group({
      nombre: [this.registro_business.nombre, Validators.required],
      empresa: [this.registro_business.empresa, Validators.required],
      cargo: [this.registro_business.cargo, Validators.required],
      correo: [this.registro_business.correo, [Validators.required, Validators.email]],
      telefono: [this.registro_business.telefono, Validators.required],
      es_miembro: [this.registro_business.es_miembro.toString(), Validators.required]
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

      const registro_business = this.registro_business;
      registro_business.nombre = _solicitud['nombre'];
      registro_business.empresa = _solicitud['empresa'];
      registro_business.cargo = _solicitud['cargo'];
      registro_business.correo = _solicitud['correo'];
      registro_business.es_miembro = _solicitud['es_miembro'] === 'true' ? true : false;
      registro_business.telefono = _solicitud['telefono'];
      if (registro_business.asistio === true) {
        registro_business.asistio = true;
      } else {
        registro_business.asistio = false;
      }
      registro_business.es_eliminado = false;

      this.service.actualizarBusiness(registro_business).then(() => {
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
    this.excel.exportAsExcelFile(this.DataVisible.map((registro_business) => {
      return {
        'Empresa': registro_business.empresa,
        'Nombre': registro_business.nombre,
        'Cargo': registro_business.cargo,
        'Correo': registro_business.correo,
        'Teléfono empresa': registro_business.telefono.split(', ')[0],
        'Teléfono móvil': registro_business.telefono.split(', ')[1] ? registro_business.telefono.split(', ')[1] : '',
        'Miembro': registro_business.es_miembro ? 'Sí' : 'No'
      };
    }), 'RegistrosBusinessNetworking');
  }

  enviarRegistro() {
    this.show_form_message = true;
    this.form_message = 'Enviando...';
    this.service.enviarRegistroBusiness(this.registro_business).subscribe(() => {
      $('.modal').modal('hide');
    });
  }

  enviarQR() {
    this.show_form_message = true;
    this.form_message = 'Enviando...';
    this.service.enviarQRBusiness(this.registro_business).subscribe(() => {
      $('.modal').modal('hide');
    });
  }

  eliminar() {
    const registro_business = this.registro_business;

    registro_business.es_eliminado = true;

    this.service.eliminarBusiness(registro_business).then(() => {
      $('.modal').modal('hide');
    });
  }

  arribo(registro_business: Business) {
    if (registro_business.asistio) {
      $('#modal_arribo_business').modal('show');
    } else {
      this.service.arriboBusiness(registro_business.key).then(() => {
        this.router.navigate(['/AmChamAdmin/asistentes']);
        $('#modal_arribo_business').modal('hide');
      });
    }
  }

  ordenar(field: string): void {
    if (this.orden_business === field) {
      this.asc_business = !this.asc_business;
    } else {
      this.asc_business = true;
      this.orden_business = field;
    }
  }

  pageLenght(e) {
    this.PageItems = e.target.value;
  }

}
