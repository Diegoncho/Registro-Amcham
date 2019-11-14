import { Component, OnInit } from '@angular/core';

import { RifaBusinessService } from '../servicios/rifa-business.service';

import { Business } from './../../admin/modelos/business.model';

@Component({
  selector: 'app-rifa-business',
  templateUrl: './rifa-business.component.html',
  styleUrls: ['./rifa-business.component.css']
})
export class RifaBusinessComponent implements OnInit {

  participantes: string[];

  participantes_refull: Business[];

  participante_seleccionado = '';
  mostrar_sorteo = true;
  mostrar_ganador = false;
  mostrar_final = false;

  seconds = 3;
  intervalId: number;

  tempo = '';

  constructor(
    private service: RifaBusinessService
  ) { }

  ngOnInit() {
    this.participantes = this.service.getParticipantesRifa();

    this.service.getParticipantes().subscribe((participantes) => {
      this.participantes_refull = participantes;
    });
  }

  seleccionar() {
    this.tempo = 'flex';
    this.intervalId = window.setInterval(() => this.tick(), 1500);
    this.seconds = 3;

    setTimeout(() => {
      this.mostrar_sorteo = false;
      this.mostrar_ganador = true;
      this.participante_seleccionado = this.pickOne();
    }, 4510);
  }

  reiniciar() {
    this.service.setParticipantes(this.participantes_refull.map((registro) => registro.nombre));

    this.participantes = this.service.getParticipantesRifa();
  }

  continuar() {
    this.mostrar_sorteo = true;
    this.mostrar_ganador = false;

    this.tempo = '';
    this.seconds = 3;
  }

  finalizar() {
    this.mostrar_final = true;
    this.mostrar_sorteo = false;
    this.mostrar_ganador = false;
  }

  pickOne(): string {
    const n_elegido = Math.floor(Math.random() * this.participantes.length);
    const elegido = this.participantes[n_elegido];

    this.participantes.splice(n_elegido, 1);

    return elegido;
  }

  tick(): void {
    if (--this.seconds < 1) {
      clearInterval(this.intervalId);
    }
  }

}
