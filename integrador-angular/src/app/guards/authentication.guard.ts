import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()){
      if (state.url === '/login'){
        this.router.navigate(['']); //If the user is authenticated, but the is in the /login route, we navigate the user to the home.
      }
      return true; //By returning true we allow the access to the route the user is trying to enter.
    } else { 
      if (state.url !== '/login'){
        this.router.navigate(['/login']); //If the user is not authenticated, and he is trying to enter to a route that is not /login, redirect it.
        return false; //By returning false we don't allow the acces to  the route.
      } 
      return true; //If the user is not authenticated, but he is in the /login route, we allow the access to the route.
    }
  }
}
