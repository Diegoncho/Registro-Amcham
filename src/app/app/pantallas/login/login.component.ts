import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  // Para poder setear el focus al tratar de entrar.
  @ViewChild('inputEmail') input_email: ElementRef;
  @ViewChild('inputPassword') input_password: ElementRef;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryLogin(value) {

    this.errorMessage = '';

    if (!value.email) {
      // Poner focus en el input del correo.
      this.input_email.nativeElement.focus();

    } else if (!value.password) {
      // Poner focus en el input de la contraseña.
      this.input_password.nativeElement.focus();
    } else {

      // Si ambos campos están llenos, intentar loguearse.
      this.authService.doLogin(value).subscribe( () => {

        // Si el logueo es exitoso, mandar a publicaciones.
        this.router.navigate(['/AmChamAdmin']);

        // Manejo de errores.
      }, (err) => {
        if (err.code === 'auth/invalid-email') {
          err.message = 'Por favor, ingrese una direccion de correo válida';
        }
        if (err.code === 'auth/wrong-password') {
          err.message = 'La contraseña no es válida.';
        }
        if (err.code === 'auth/user-not-found') {
          err.message = 'No hay registro de este usuario';
        }
        if (err.code === 'auth/network-request-failed') {
          err.message = 'A ocurrido un error en la red';
        }
        if (err.code === '403') {
          err.message = 'Acceso denegado';
        }
        this.errorMessage = err.message;
      });
    }
  }

}
