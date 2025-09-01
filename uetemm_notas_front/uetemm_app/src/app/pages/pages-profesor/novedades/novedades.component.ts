import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { CursoProfesorService } from '../../../services/cursoProfesor/curso-profesor.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/auth/user';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css'],
})
export class NovedadesComponent implements OnInit {
  data = [
    { nombre: 'Ejemplo 1', descripcion: 'Descripción del ejemplo 1' },
    { nombre: 'Ejemplo 2', descripcion: 'Descripción del ejemplo 2' },
  ];

    loading: boolean = true;
  userLoggedOn: boolean = false;
  userDataToken!: any;
  user?: User;
  errorMessage: String = '';
  expirationDate: Date | null = null;
  cursosProfesor!: any[];

  timeLeft: string = ''; // Tiempo restante en formato mm:ss
  private timerSubscription!: Subscription;

  constructor(
    private cursoProfesorService: CursoProfesorService,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loginService.userData.subscribe({
      next: (userDataToken) => {
        this.userDataToken = this.loginService.decodeToken(userDataToken);
      },
    });

    this.loginService.currentUserLoggedOn.subscribe({
      next: (userLoggedOn) => {
        this.userLoggedOn = userLoggedOn;
      },
    });

    const expirationDate = this.loginService.getTokenExpirationDate();
    if (expirationDate) {
      this.startTimer(expirationDate);
    }

    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data OK.');
      },
    });

    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
        this.cursoProfesorService
          .getAllCursoProfesorByProfesorId(this.user.id)
          .subscribe({
            next: (cursos) => {
              this.cursosProfesor = cursos;
              this.cursosProfesor.sort((a, b) => {
                const nivelComparison = a.curso.nivel.nombre.localeCompare(
                  b.curso.nivel.nombre
                );
                if (nivelComparison !== 0) return nivelComparison;

                const subnivelComparison =
                  a.curso.subnivel.nombre.localeCompare(
                    b.curso.subnivel.nombre
                  );
                if (subnivelComparison !== 0) return subnivelComparison;

                const gradoComparison = a.curso.grado.nombre.localeCompare(
                  b.curso.grado.nombre
                );
                if (gradoComparison !== 0) return gradoComparison;

                const paraleloComparison =
                  a.curso.paralelo.nombre.localeCompare(
                    b.curso.paralelo.nombre
                  );
                if (paraleloComparison !== 0) return paraleloComparison;

                return a.curso.jornada.nombre.localeCompare(
                  b.curso.jornada.nombre
                );
              });

              console.log('cursosProfesor', this.cursosProfesor);

              this.cursosProfesor.forEach((cursoProfesor) => {
                cursoProfesor.curso.nombre =
                  cursoProfesor.curso.grado.nombre +
                  ' ' +
                  cursoProfesor.curso.paralelo.nombre +
                  ' de ' +
                  cursoProfesor.curso.nivel.nombre +
                  ' ' +
                  cursoProfesor.curso.subnivel.nombre;
              });

              if (cursos.length === 0) {
                Swal.fire({
                  title: 'Advertencia!',
                  text: 'No cuenta con Cursos asignados a su usuario, Solicite asistencia a su administrador.',
                  icon: 'warning',
                  confirmButtonText: 'Ok',
                });
              }
            },
            error: (errorData) => {
              console.error('Error al cargar los cursos del profesor:', errorData);
              Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los cursos del profesor.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            },
            complete: () => {
              this.loading = false; // Oculta el spinner de carga
            },
          });
      },
      error: (errorData) => {
        console.log('no se puede obtener la inforamcion del usuario loggeado.');
        this.errorMessage = errorData;
      },
    });
  }

  startTimer(expirationDate: Date): void {
    // Crear un intervalo que se actualice cada segundo
    this.timerSubscription = interval(1000).subscribe(() => {
      const currentTime = new Date().getTime();
      const timeDifference = expirationDate.getTime() - currentTime;

      if (timeDifference <= 0) {
        this.timeLeft = '00:00'; // Token expirado
        this.timerSubscription.unsubscribe();

        // Mostrar alerta con SweetAlert al expirar el token
        Swal.fire({
          title: 'Sesión expirada',
          text: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Redirigir al usuario a la página de inicio de sesión, si es necesario
          this.loginService.logout();
        });
      } else {
        // Convertir la diferencia de tiempo a minutos y segundos
        const minutes = Math.floor(timeDifference / 60000); // 1 minuto = 60000 ms
        const seconds = Math.floor((timeDifference % 60000) / 1000);

        // Formatear a mm:ss
        this.timeLeft = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
      }
    });
  }
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnDestroy(): void {
    // Limpiar el temporizador cuando el componente se destruya
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  logout() {
    this.loginService.logout();
  }

  seleccionarCurso(cursoProfesor: any) {
    Swal.fire({
      title: 'Seleccionar Curso',
      text: `${cursoProfesor.asignatura.nombre} \n- ${cursoProfesor.curso.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seleccionar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.show();
        setTimeout(() => {
          this.router
            //.navigate([`/novedades/curso/${cursoProfesor.curso.id}`])
            .navigate([`/novedades/cursoProfesor/${cursoProfesor.id}`])
            //.navigate(['/novedades/curso', cursoProfesor.curso.id])
            .then(() => {
              this.loadingService.hide(); // Oculta el spinner de carga
            });
        }, 500); // Retraso de 2 segundos antes de la navegación
      }
    });
  }
}
