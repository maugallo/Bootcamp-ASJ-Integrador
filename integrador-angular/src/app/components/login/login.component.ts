import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { AlertHandler } from '../../utils/alertHandler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: User = {
    email: '',
    password: '',
  }

  private alertHandler = new AlertHandler();

  constructor(private authService: AuthenticationService, private router: Router) {}

  onLogin(){
    this.authService.authenticateUser(this.user).subscribe({
      next: (data) => {
        if (data) {
          this.alertHandler.getToast().fire({
            icon: 'success',
            title: 'Ingreso correcto',
            position: 'top',
            showCloseButton: false,
          });
          localStorage.setItem('authenticated', 'true');
          this.router.navigate(['']);
        } else {
          this.alertHandler.getToast().fire({
            icon: 'error',
            title: 'Email o contraseña inválidos',
            position: 'top',
            showCloseButton: false,
          });
        }
      },
      error: () => {
        this.alertHandler.getToast().fire({
          icon: 'error',
          title: 'Ocurrió un error inesperado, inténtalo más tarde',
          position: 'top',
          showCloseButton: false,
        });
      }
    })
  }

}
