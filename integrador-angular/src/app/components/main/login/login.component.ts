import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/utils/alert.service';

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

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) {}

  onLogin(){
    this.authService.authenticateUser(this.user).subscribe({
      next: (data) => {
        if (data) {
          this.alertService.getSuccessToast("Ingreso correcto").fire();
          localStorage.setItem('authenticated', 'true');
          this.router.navigate(['']);
        } else {
          this.alertService.getErrorToast("Email o contraseña inválidos").fire();
        }
      },
      error: () => {
        this.alertService.getErrorToast("Ocurrió un error inesperado, inténtalo más tarde").fire();
      }
    })
  }

}
