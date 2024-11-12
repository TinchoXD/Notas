import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav'; // Importa MatDrawer
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'], // Corrige el typo en 'styleUrl'
})
export class NavMenuComponent {
  userLoggedOn: boolean = false;
  userDataToken!: any;
  user?: User;
  errorMessage: String = '';
  expirationDate: Date | null = null;

  timeLeft: string = ''; // Tiempo restante en formato mm:ss
  private timerSubscription!: Subscription;

  // Agrega la referencia al MatDrawer
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    public dialogo: MatDialog,
    public router: Router,
  ) {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        console.info('userDatauserDatauserDatauserDatauserData', userData);
        this.user = userData;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data OK.');
      },
    });
  }

  esRutaMisCalificaciones() {
    return this.router.url.includes('/estudiante/mis-calificaciones/');
  }

  ngOnInit(): void {
    //this.esRutaMisCalificaciones();

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
  }

  logout() {
    this.loginService.logout();
  }

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          titulo: `¿Confirmar cerrar sesión?`,
          mensaje: ``,
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.logout();
        } else {
          this.dialogo.closeAll();
        }
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
          confirmButtonText: 'Aceptar'
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
}
