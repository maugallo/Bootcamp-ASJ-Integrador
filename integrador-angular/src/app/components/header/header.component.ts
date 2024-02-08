import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{

  isUserAuthenticated!: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getIsUserAuthenticated().subscribe({
      next: (data) => {
        this.isUserAuthenticated = data;
      }
    })
  }

  logOut(){
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed){
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }
}
