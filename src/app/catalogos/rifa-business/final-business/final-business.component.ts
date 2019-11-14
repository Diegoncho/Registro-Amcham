import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-business',
  templateUrl: './final-business.component.html',
  styleUrls: ['./final-business.component.css']
})
export class FinalBusinessComponent implements OnInit {

  mostrar_gif = true;

  constructor() { }

  ngOnInit() {
    const duracion_gif = 4100;

    setTimeout(() => {
      this.mostrar_gif = false;
    }, duracion_gif);
  }

}
