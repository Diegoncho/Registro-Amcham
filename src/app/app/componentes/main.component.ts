import { Component } from '@angular/core';

// Este componente contiene al resto de componente, desde que el usuario inicia sesión.

@Component({
  selector: 'app-main',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
    <!-- <p class="p-copyright">
      Copyright © Todos los derechos reservados, i-Strategies® 2019
    </p> -->
  `,
  styles: [`
    .p-copyright {
      font-size: 12px;
      position: fixed;
      bottom: -12px;
      width: 100%;
      text-align: center;
      margin: 0px 0px 10px 0px;
    }
  `]
})
export class MainComponent { }
