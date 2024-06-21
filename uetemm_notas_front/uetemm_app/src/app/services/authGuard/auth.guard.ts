import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  //! REVISAR
  constructor() { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }





}


/* export const authGuard: CanActivateFn = (route, state) => {
  return true;
}; */
