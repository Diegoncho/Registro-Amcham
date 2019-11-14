import { Component, OnInit } from '@angular/core';
import { RifaService } from './rifa.service';

@Component({
  selector: 'app-rifa',
  templateUrl: './rifa.component.html',
  styleUrls: ['./rifa.component.css']
})
export class RifaComponent implements OnInit {
  participante_seleccionado = '';
  mostrar_sorteo = false;
  mostrar_fase = false;
  mostrar_final = false;

  sorteos = [
    'v', 'v', 'v', 'v', 'v', 'i', 'd', 'd', 'v'
  ];
  sorteo: string;

  mensajes = [
    'e', 'e', 'e', 'e', 'e', 'i', 'd', 'd', 'a'
  ];
  mensaje: string;

  step = 0;

  mensajes_eliminacion = [
    'Primer eliminado',
    'Segundo eliminado',
    'Tercer eliminado',
    'Cuarto eliminado',
    'Quinto eliminado',
  ];

  mensaje_eliminacion = '';

  participantes: string[];

  constructor(private rifaService: RifaService) { }

  ngOnInit() {
    this.participantes = this.rifaService.getParticipantes();

    this.sortear();
  }

  sortear() {
    this.mostrar_sorteo = true;
    this.mostrar_fase = false;
    this.sorteo = this.sorteos[this.step];

    setTimeout(() => {
      this.seleccionar();
    }, 10000);
  }

  seleccionar() {
    this.mensaje_eliminacion = this.mensajes_eliminacion[this.step] || '';
    this.mensaje = this.mensajes[this.step];
    this.participante_seleccionado = this.pickOne();
    this.mostrar_fase = true;
    this.mostrar_sorteo = false;
  }

  continuar() {
    this.step++;
    if (this.sorteos.length === this.step) {
      this.mostrar_final = true;
      this.mostrar_fase = false;
      this.mostrar_sorteo = false;
    } else {
      this.sortear();
    }
  }

  pickOne(): string {
    const n_elegido = Math.floor(Math.random() * this.participantes.length);
    const elegido = this.participantes[n_elegido];

    this.participantes.splice(n_elegido, 1);

    return elegido;
  }
}
