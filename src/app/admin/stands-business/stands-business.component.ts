import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { StaffService } from '../servicios/staff.service';
import { EmpresaService } from './../servicios/empresa.service';
import { ExcelService } from './../servicios/excel.service';

import { StaffBusiness } from '../modelos/staff-business.model';
import { Empresa } from './../modelos/empresa.model';

declare var $: any;

@Component({
  selector: 'app-stands-business',
  templateUrl: './stands-business.component.html',
  styleUrls: ['./stands-business.component.css']
})
export class StandsBusinessComponent implements OnInit {
  @Input() Data = [];
  @Input() DataVisible = [];

  registro_business: StaffBusiness;
  empresas: Empresa[];

  solicitudForm: FormGroup;

  busqueda_business = '';
  orden_business: string;
  asc_business = false;

  form_message: string;
  show_form_message = false;
  show_error_message = false;

  PageItems = 10;

  constructor(
    private service: StaffService,
    private service_2: EmpresaService,
    private fb: FormBuilder,
    private excel: ExcelService,
  ) { }

  ngOnInit() {

    this.service_2.getEmpresas().subscribe((registros) => {
      this.empresas = registros;
    });

    this.solicitudForm = this.fb.group({
      empresa: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.pattern(/^\d{4}-{1}\d{4}$/)]
    });
  }

  get f_empresa() { return this.solicitudForm.get('empresa'); }
  get f_nombre() { return this.solicitudForm.get('nombre'); }
  get f_correo() { return this.solicitudForm.get('correo'); }
  get f_telefono() { return this.solicitudForm.get('telefono'); }

  selectRegistro(registro_business: StaffBusiness) {
    this.registro_business = registro_business;

    this.show_form_message = false;
    this.form_message = '';
  }

  crear() {
    if (this.solicitudForm.valid) {
      const _solicitud = this.solicitudForm.value;

      this.show_form_message = true;
      this.form_message = 'Registrando...';

      const registro = new StaffBusiness();

      registro.empresa = _solicitud['empresa'];
      registro.nombre = _solicitud['nombre'];
      registro.correo = _solicitud['correo'];
      registro.telefono = _solicitud['telefono'];
      registro.fecha = new Date();

      this.service.crearStaff(registro).then(() => {
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

  exportarExcel(): void {
    this.excel.exportAsExcelFile(this.DataVisible.map((registro_business) => {
      return {
        'Empresa': registro_business.empresa,
        'Nombre': registro_business.nombre,
        'Correo': registro_business.correo,
        'Teléfono móvil': registro_business.telefono,
      };
    }), 'StandsBusinessNetworking');
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

  enviarQR() {
    this.show_form_message = true;
    this.form_message = 'Enviando...';
    this.service.enviarQRBusiness(this.registro_business).subscribe(() => {
      $('.modal').modal('hide');
    });
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
