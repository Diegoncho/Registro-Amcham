import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { textTrigger } from './animation';

@Component({
  selector: 'app-ganador-i-strategies',
  templateUrl: './ganador-i-strategies.component.html',
  styleUrls: ['./ganador-i-strategies.component.css'],
  animations: [textTrigger]
})
export class GanadorIStrategiesComponent implements OnInit {

  @Input() mensaje_inicial;
  @Input() mensaje_ganador;

  @Output() continue = new EventEmitter<void>();

  mensaje = '';
  textState = 'noDisplayText';
  mostrar_avion = true;

  constructor() { }

  ngOnInit() {

    const duracion_gif = 2500;

    setTimeout(() => {
      this.mostrar_avion = false;
    }, duracion_gif);

    this.mensaje = this.mensaje_inicial;
    this.textState = 'displayText';

    setTimeout(() => {
      this.textState = 'noDisplayText';
      this.mostrarMensajeGanador();
    }, duracion_gif + 2000);
  }

  mostrarMensajeGanador() {
    setTimeout(() => {
      this.mensaje = this.mensaje_ganador;
      this.textState = 'displayText';
    }, 3000);
  }

  next() {
    this.continue.emit();
  }

}
