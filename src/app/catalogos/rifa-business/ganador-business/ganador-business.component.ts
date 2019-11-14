import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { textTrigger } from './animation';

@Component({
  selector: 'app-ganador-business',
  templateUrl: './ganador-business.component.html',
  styleUrls: ['./ganador-business.component.css'],
  animations: [textTrigger]
})
export class GanadorBusinessComponent implements OnInit {
  @Input() participante_seleccionado: string;
  @Input() mensaje_inicial;
  @Input() mensaje_ganador;

  @Output() someEvent_2 = new EventEmitter<string>();
  @Output() someEventEnd = new EventEmitter<string>();

  mostrar_gif = true;

  mensaje = '';
  textState = 'noDisplayText';

  constructor() { }

  ngOnInit() {
    const duracion_gif = 3800;

    setTimeout(() => {
      this.mostrar_gif = false;
    }, duracion_gif);

    this.mensaje = this.mensaje_inicial;
    this.textState = 'displayText';

    setTimeout(() => {
      this.textState = 'noDisplayText';
      this.mostrarMensajeGanador();
    }, duracion_gif + 1000);
  }

  mostrarMensajeGanador() {
    setTimeout(() => {
      this.mensaje = this.mensaje_ganador;
      this.textState = 'displayText';
    }, 1500);
  }

  callParent() {
    this.someEvent_2.emit();
  }

  callParent_2() {
    this.someEventEnd.emit();
  }
}
