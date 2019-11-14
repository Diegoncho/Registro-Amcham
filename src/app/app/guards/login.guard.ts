import { Injectable } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  // Guarda para saltarse el login.
  canActivate(): Observable<boolean> {
    return new Observable( (observer) => {

      // Verificar si el usuario está logueado.
      this.authService.isLogged().subscribe(logged => {
        if (!logged) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);

          // Si ya está logueado, mandar a publicaciones.
          this.router.navigate(['/AmChamAdmin']);
          observer.complete();
        }
      });
    });
  }
}
