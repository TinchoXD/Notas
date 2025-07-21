import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';
import { filter } from 'rxjs/operators';
import { CursoServiceShared } from './shared/cursoShared.service';
import { CursoService } from './services/curso/curso.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'notas_app';

  isLoginPage = false;
  isMisCalificacionesPage = false;
  isNovedadesPage = false;
  isNovedadesCursoPage = false;

  userData!: any;

  constructor(
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
   /*  this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getChild(this.activatedRoute);
        route.paramMap.subscribe((params) => {
          const cursoId = params.get('cursoid');
          this.isNovedadesCursoPage = !!cursoId;
          console.log('Detectado cursoId:', cursoId);
        });
      }); */

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getChild(this.activatedRoute);
        route.paramMap.subscribe((params) => {
          const cursoId = Number(params.get('cursoid'));
          console.log('Detectado cursoId:', cursoId);
          if (cursoId) {
            this.cursoService.setCursoId(cursoId);
            this.isNovedadesCursoPage = true;
          } else {
            this.isNovedadesCursoPage = false;
          }
        });
      });

    // Suscribirse a los eventos de navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es la de login
        this.isLoginPage = this.router.url === '/iniciar-sesion';
        this.isMisCalificacionesPage =
          this.router.url === '/estudiante/mis-calificaciones';
        this.isNovedadesPage = this.router.url === '/novedades';
        this.isNovedadesCursoPage =
          this.router.url.startsWith('/novedades/curso/');
        //this.isNovedadesCursoPage = this.router.url.includes('/novedades/curso/');
      }
    });
  }
  ngOnInit(): void {
    this.loginService.userData.subscribe((token) => {
      if (token) {
        // Decodifica el token para obtener la información del usuario
        this.userData = this.loginService.decodeToken(token);
        this.loginService.verificarCambioDeContrasenia(this.userData);
      }
    });
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
