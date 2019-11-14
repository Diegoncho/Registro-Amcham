import { Component, OnInit, Input } from '@angular/core';
import { placesStates, placesTrigger } from './animation';

@Component({
  selector: 'app-sorteo-i-strategies',
  templateUrl: './sorteo-i-strategies.component.html',
  styleUrls: ['./sorteo-i-strategies.component.css'],
  animations: [placesTrigger]
})
export class SorteoIStrategiesComponent implements OnInit {
  @Input() participantes = [];
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
}
