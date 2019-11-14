import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AmChamService } from '../servicios/amcham.service';

import { BusinessDB } from './../modelos/businessdb.model';
import { RegistroDB } from '../modelos/registrodb.model';

declare var $: any;

@Component({
  templateUrl: './registro-am-cham.component.html',
  styleUrls: ['./registro-am-cham.component.css']
})
export class RegistroAmChamComponent implements OnInit {
  solicitudForm: FormGroup;

  form_message: string;
  show_form_message = false;
  show_error_message = false;
  actualizando = false;

  constructor(
    private service: AmChamService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.solicitudForm = this.fb.group({
      nombre: ['', Validators.required],
      empresa: ['', Validators.required],
      cargo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono_fijo: ['', Validators.pattern(/^\d{4}-{1}\d{4}$/)],
      telefono_movil: ['', Validators.pattern(/^\d{4}-{1}\d{4}$/)],
      es_miembro: [, Validators.required]
    });
  }

  get f_nombre() { return this.solicitudForm.get('nombre'); }
  get f_empresa() { return this.solicitudForm.get('empresa'); }
  get f_cargo() { return this.solicitudForm.get('cargo'); }
  get f_correo() { return this.solicitudForm.get('correo'); }
  get f_telefono_fijo() { return this.solicitudForm.get('telefono_fijo'); }
  get f_telefono_movil() { return this.solicitudForm.get('telefono_movil'); }
  get f_es_miembro() { return this.solicitudForm.get('es_miembro'); }

  crear() {
    if (this.solicitudForm.valid) {
      const _solicitud = this.solicitudForm.value;

      // Mostrar mensajes.
      this.show_form_message = true;
      this.actualizando = true;
      this.form_message = 'Registrando...';

      const registro = new BusinessDB();

      const telefonos = [];

      registro.nombre = _solicitud['nombre'];
      registro.empresa = _solicitud['empresa'];
      registro.cargo = _solicitud['cargo'];
      registro.correo = _solicitud['correo'];
      registro.es_miembro = _solicitud['es_miembro'] === 'true' ? true : false;

      if (_solicitud['telefono_fijo']) {
        telefonos.push(_solicitud['telefono_fijo']);
      }

      if (_solicitud['telefono_movil']) {
        telefonos.push(_solicitud['telefono_movil']);
      }

      registro.telefono = telefonos.join(', ');
      registro.fecha = new Date();

      this.service.registrar(registro).then(() => {
        this.form_message = 'Registrado!';
        this.router.navigate(['./done'], {relativeTo: this.route});
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
}
