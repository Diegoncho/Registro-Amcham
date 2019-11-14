import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { placesStates, placesTrigger } from './animation';

@Component({
  selector: 'app-sorteo-business',
  templateUrl: './sorteo-business.component.html',
  styleUrls: ['./sorteo-business.component.css'],
  animations: [placesTrigger]
})
export class SorteoBusinessComponent implements OnInit {
  @Input() participantes =  [];
  @Input() seconds: number;
  @Input() tempo = '';

  @Output() someEvent = new EventEmitter<string>();
  @Output() someEventBoot = new EventEmitter<string>();

  estados = {};
  display = true;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.participantes.length; i++) {
      this.estados[i] = this.getRandomState();
    }

    setInterval(() => {
      for (let i = 0; i < this.participantes.length; i++) {
        this.estados[i] = this.getRandomState();
      }
    }, 2000);
  }

  getRandomState(): string {
    const n_elegido = Math.floor(Math.random() * placesStates.length);
    return placesStates[n_elegido].name;
  }

  callParent() {
    this.someEvent.emit();
  }

  callParent_2() {
    this.someEventBoot.emit();
  }

}
