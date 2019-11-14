import { Component, OnInit } from '@angular/core';

import { ResultadoService } from '../servicios/resultado.service';
import { ExcelService } from '../servicios/excel.service';

import { Resultado } from '../modelos/resultado.model';
import { ResultadoBusiness } from '../modelos/resultado_business.model';

import { Encuesta } from '../../catalogos/modelos/encuesta.model';
import { EncuestaBusiness } from './../../catalogos/modelos/encuesta-business.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  resultados: Resultado;
  resultados_business: ResultadoBusiness;

  encuesta: Encuesta;
  encuestas: Encuesta[];

  encuesta_business: EncuestaBusiness;
  encuestas_business: EncuestaBusiness[];

  public barChartOptions = {
    scaleShowVerticalLines: true,
    reponsive: true
  };

  public Labels = ['Malo', 'Regular', 'Bueno', 'Muy Bueno', 'Excelente'];
  public Labels_1 = ['Muy Insatifecho', 'Insatisfecho', 'Ni Satisfecho', 'Satisfecho', 'Muy Satisfecho'];
  public Labels_2 = ['Muy Mala', 'Mala', 'Regular', 'Buena', 'Muy Buena'];
  public Labels_3 = ['Muy Mala', 'Mala', 'Indiferente', 'Buena', 'Muy Buena'];
  public Labels_4 = ['No', 'Si'];
  public Labels_5 = ['Nada', 'Poco', 'Mucho'];
  public Labels_6 = ['Muy Barato', 'Barato', 'Ni Barato', 'Caro', 'Muy Caro'];
  public Labels_7 = ['Nada Valioso', 'Poco Valioso', 'Indiferente', 'Valioso', 'Muy Valioso'];
  public Labels_8 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public Labels_10 = ['No', 'Si'];

  respuestasHash = {
    '1': 'Malo',
    '2': 'Regular',
    '3': 'Bueno',
    '4': 'Muy Bueno',
    '5': 'Excelente'
  };
  respuestasHash_1 = {
    '1': 'Muy Insatifecho',
    '2': 'Insatisfecho',
    '3': 'Ni Satisfecho',
    '4': 'Satisfecho',
    '5': 'Muy Satisfecho'
  };
  respuestasHash_2 = {
    '1': 'Muy Mala',
    '2': 'Mala',
    '3': 'Regular',
    '4': 'Buena',
    '5': 'Muy Buena'
  };
  respuestasHash_3 = {
    '1': 'Muy Mala',
    '2': 'Mala',
    '3': 'Regular',
    '4': 'Buena',
    '5': 'Muy Buena'
  };
  respuestasHash_4 = {
    '0': 'No',
    '1': 'Si'
  };
  respuestasHash_5 = {
    '1': 'Nada',
    '2': 'Poco',
    '3': 'Mucho'
  };
  respuestasHash_6 = {
    '1': 'Muy Barato',
    '2': 'Barato',
    '3': 'Ni Barato',
    '4': 'Caro',
    '5': 'Muy Caro'
  };
  respuestasHash_7 = {
    '1': 'Nada Valioso',
    '2': 'Poco Valioso',
    '3': 'Indiferente',
    '4': 'Valioso',
    '5': 'Muy Valiso'
  };
  respuestasHash_10 = {
    '0': 'No',
    '1': 'Si'
  };

  table = 'Business Networking';

  constructor(
    private service: ResultadoService,
    private excel: ExcelService
  ) { }

  ngOnInit() {
    this.service.getEncuestas().subscribe((encuestas) => {
      this.encuestas = encuestas;

      const resultado = new Resultado();
        for (let i = 0; i < encuestas.length; i++) {
          const data = encuestas[i];
          resultado.pregunta_1[Number.parseInt(data.pregunta_1, 10) - 1]++;
          resultado.pregunta_2[Number.parseInt(data.pregunta_2, 10) - 1]++;
          resultado.pregunta_3[Number.parseInt(data.pregunta_3, 10) - 1]++;
          resultado.pregunta_4[Number.parseInt(data.pregunta_4, 10) - 1]++;
          resultado.pregunta_5[Number.parseInt(data.pregunta_5, 10) - 1]++;
        }

        this.resultados = resultado;
    });

    this.service.getEncuestasBusiness().subscribe((encuestas) => {
      this.encuestas_business = encuestas;

      const resultado = new ResultadoBusiness();
        for (let i = 0; i < encuestas.length; i++) {
          const data = encuestas[i];
          resultado.pregunta_1[Number.parseInt(data.pregunta_1, 10) - 1]++;
          resultado.pregunta_2[Number.parseInt(data.pregunta_2, 10) - 1]++;
          resultado.pregunta_3[Number.parseInt(data.pregunta_3, 10) - 1]++;
          resultado.pregunta_4[Number.parseInt(data.pregunta_4, 10)]++;
          resultado.pregunta_5[Number.parseInt(data.pregunta_5, 10) - 1]++;
          resultado.pregunta_6[Number.parseInt(data.pregunta_6, 10) - 1]++;
          resultado.pregunta_7[Number.parseInt(data.pregunta_7, 10) - 1]++;
          resultado.pregunta_8[Number.parseInt(data.pregunta_8, 10)]++;
          resultado.pregunta_10[Number.parseInt(data.pregunta_10, 10)]++;
        }

        this.resultados_business = resultado;
    });
  }

  exportarExcel(): void {
    this.excel.exportAsExcelFile(this.encuestas.map((encuesta) => {
      return{
        'Contenido': this.respuestasHash[encuesta.pregunta_1],
        'Conferencia #1': this.respuestasHash[encuesta.pregunta_2],
        'Conferencia #2': this.respuestasHash[encuesta.pregunta_3],
        'Conferencia #3': this.respuestasHash[encuesta.pregunta_4],
        'Organización': this.respuestasHash[encuesta.pregunta_5],
        'Temas': encuesta.pregunta_6,
      };
    }), 'EncuestaFeriaTecnologia');
  }

  exportarBusinessExcel(): void {
    this.excel.exportAsExcelFile(this.encuestas_business.map((encuesta) => {
      return{
        'Pregunta #1': this.respuestasHash_1[encuesta.pregunta_1],
        'Pregunta #2': this.respuestasHash_2[encuesta.pregunta_2],
        'Pregunta #3': this.respuestasHash_3[encuesta.pregunta_3],
        'Pregunta #4': this.respuestasHash_4[encuesta.pregunta_4[0]] + encuesta.pregunta_4.substring(2),
        'Pregunta #5': this.respuestasHash_5[encuesta.pregunta_5],
        'Pregunta #6': this.respuestasHash_6[encuesta.pregunta_6],
        'Pregunta #7': this.respuestasHash_7[encuesta.pregunta_7],
        'Pregunta #8': encuesta.pregunta_8,
        'Pregunta #9': encuesta.pregunta_9,
        'Pregunta #10': this.respuestasHash_10[encuesta.pregunta_10[0]] + encuesta.pregunta_10.substring(2),
        'Pregunta #11': encuesta.pregunta_11,
      };
    }), 'BusinessNetworking');
  }

  evento(e) {
    this.table = e.target.value;
  }
}
