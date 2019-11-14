import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { containerTrigger, contentTrigger, textTrigger, content_transition_tick, container_transition_tick } from './animation';

@Component({
  selector: 'app-eliminado',
  templateUrl: './eliminado.component.html',
  styleUrls: ['./eliminado.component.css'],
  animations: [ containerTrigger, contentTrigger, textTrigger ]
})
export class EliminadoComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('nombre') nombre_eliminado;
  @Input() mensaje_eliminacion;
  @Input() mensaje_eliminado;

  @Output() continue = new EventEmitter<void>();

  contentState = 'contentLeft';
  containerState = 'containerTop';
  mostrar_eliminado = false;
  mostrar_avion = true;
  mensaje_eliminacion_state = 'noDisplayText';
  mensaje_eliminado_state = 'noDisplayText';

  current_step = 0;
  steps = [
    'contentLeft',
    'contentCenter',
    'contentRight',
    'contentCenter'
  ];

  constructor() { }

  ngOnInit() {
    const duracion_gif = 2500;

    setTimeout(() => {
      this.mostrar_avion = false;
    }, duracion_gif);

    setTimeout(() => {
      this.mensaje_eliminacion_state = 'displayText';
      setInterval(() => {
        this.setContentState(this.nextStep());
        this.mostrar_eliminado = true;
      }, content_transition_tick);

      setTimeout(() => {
        this.setContentState(this.nextStep());
        this.setContainerState('containerBottom');
      }, 100);
    }, duracion_gif - content_transition_tick);

    setTimeout( () => {
      this.mensaje_eliminacion_state = 'noDisplayText';
      this.mensaje_eliminado_state = 'displayText';
    }, container_transition_tick);
  }

  setContainerState(containerState: string) {
    this.containerState = containerState;
  }

  setContentState(contentState: string) {
    this.contentState = contentState;
  }

  nextStep(): string {
    if (this.current_step >= this.steps.length) {
      this.current_step = 0;
    }

    return this.steps[this.current_step++];
  }

  next() {
    this.continue.emit();
  }

}
