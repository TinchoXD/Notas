import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'uetemm_app';

  isLoginPage = false;
  isMisCalificacionesPage = false;

  userData!: any


  constructor(private router: Router, private loginService: LoginService) {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es la de login
        this.isLoginPage = this.router.url === '/iniciar-sesion';
        this.isMisCalificacionesPage = this.router.url === '/estudiante/mis-calificaciones';
      }
    });
  }
  ngOnInit(): void {
    
    this.loginService.userData.subscribe((token) => {
      if (token) {
        // Decodifica el token para obtener la información del usuario
        this.userData = this.loginService.decodeToken(token);
        this.loginService.verificarCambioDeContrasenia(this.userData)

        console.log('userData 123123123', this.userData)

      }
    });
  }

  

}
