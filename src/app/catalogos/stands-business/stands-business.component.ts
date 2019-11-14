import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Empresa } from './../../admin/modelos/empresa.model';
import { EmpresaService } from './../../admin/servicios/empresa.service';
import { StaffBusinessService } from './../servicios/staff-business.service';

import { StaffBusinessDB } from '../modelos/staff-businessdb.model';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-stands-business',
  templateUrl: './stands-business.component.html',
  styleUrls: ['./stands-business.component.css']
})
export class StandsBusinessComponent implements OnInit {
  solicitudForm: FormGroup;
  myForm: FormControl;

  empresas: Empresa[];

  form_message: string;
  show_form_message = false;
  show_error_message = false;

  filteredEmpresas: Observable<any>;

  constructor(
    private service: EmpresaService,
    private service_2: StaffBusinessService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.myForm = new FormControl('', Validators.required);
    this.filteredEmpresas = this.myForm.valueChanges
      .pipe(
        startWith(''),
        map(empresa => empresa ? this.filterEmpresas(empresa) : this.empresas.slice())
      );

    this.service.getEmpresas().subscribe((registros) => {
      this.empresas = registros;
    });

    this.solicitudForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono_movil: ['', [Validators.pattern(/^\d{4}-{1}\d{4}$/)]],
    });
  }

  get f_nombre() { return this.solicitudForm.get('nombre'); }
  get f_correo() { return this.solicitudForm.get('correo'); }
  get f_telefono_movil() { return this.solicitudForm.get('telefono_movil'); }

  filterEmpresas(name: string) {
    return this.empresas.filter(empresa =>
      empresa.nombre.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  crear() {
    if (this.solicitudForm.valid) {
      const _solicitud = this.solicitudForm.value;

      // Mostrar mensajes.
      this.show_form_message = true;
      this.form_message = 'Registrando...';

      const registro = new StaffBusinessDB();

      registro.empresa = this.myForm.value;
      registro.nombre = _solicitud['nombre'];
      registro.correo = _solicitud['correo'];
      registro.telefono = _solicitud['telefono_movil'];
      registro.fecha = new Date();

      this.service_2.registrar(registro).then(() => {
        this.form_message = 'Registrado!';
        this.router.navigate(['./done'], {relativeTo: this.route});
      }).catch((err) => {
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
