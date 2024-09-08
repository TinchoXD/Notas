import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uetemm_app';

  isLoginPage = false;
  isMisCalificacionesPage = false;


  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es la de login
        this.isLoginPage = this.router.url === '/iniciar-sesion';
        this.isMisCalificacionesPage = this.router.url === '/estudiante/mis-calificaciones';
      }
    });
  }

  

}
