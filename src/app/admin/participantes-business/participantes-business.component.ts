import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RifaBusinessService } from './../../catalogos/servicios/rifa-business.service';
import { ParticipantesService } from './../servicios/participantes.service';
import { ExcelService } from './../servicios/excel.service';

import { Business } from '../modelos/business.model';

@Component({
  selector: 'app-participantes-business',
  templateUrl: './participantes-business.component.html',
  styleUrls: ['./participantes-business.component.css']
})
export class ParticipantesBusinessComponent implements OnInit {
  @Input() Data = [];
  @Input() DataVisible = [];

  registro_business: Business;

  participantes: Business[];

  busqueda_business = '';
  orden_business: string;
  asc_business = false;

  PageItems = 10;

  constructor(
    private service: ParticipantesService,
    private serviceRifa: RifaBusinessService,
    private excel: ExcelService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.serviceRifa.getParticipantes().subscribe((registros) => {
      this.participantes = registros;
    });
   }

  selectRegistro(registro_business: Business) {
    this.registro_business = registro_business;
  }

  exportarExcel(): void {
    this.excel.exportAsExcelFile(this.DataVisible.map((registro_business) => {
      return {
        'Empresa': registro_business.empresa,
        'Nombre': registro_business.nombre,
        'Cargo': registro_business.cargo,
        'Correo': registro_business.correo,
        'Teléfono empresa': registro_business.telefono.split(', ')[0],
        'Teléfono móvil': registro_business.telefono.split(', ')[1] ? registro_business.telefono.split(', ')[1] : ''
      };
    }), 'AsistentesBusinessNetworking');
  }

  goToRifa() {
    this.serviceRifa.setParticipantes(this.participantes.map((registro) => registro.nombre));

    this.router.navigate(['AmCham/rifa']);
  }

  ordenar(field: string) {
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
