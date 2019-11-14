import { Injectable } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  // Guard para mostrar las páginas solo cuando está logueado.
  canActivate(): Observable<boolean> {
    return new Observable( (observer) => {

      // Verificar si el usuario está logueado.
      this.authService.isLogged().subscribe( (logged) => {
        if (logged) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);

          // Si no está logueado, mandar al login.
          this.router.navigate(['login']);
          observer.complete();
        }
      });
    });
  }
}
