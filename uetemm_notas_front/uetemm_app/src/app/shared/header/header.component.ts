import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  logout(){
    this.loginService.logout();
  }
}
