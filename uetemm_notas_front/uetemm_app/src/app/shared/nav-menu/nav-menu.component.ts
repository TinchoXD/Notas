import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav'; // Importa MatDrawer
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'] // Corrige el typo en 'styleUrl'
})
export class NavMenuComponent {
  userLoggedOn: boolean = false;
  user?: User;
  errorMessage: String = '';

  // Agrega la referencia al MatDrawer
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    public dialogo: MatDialog,
    public router: Router
  ) {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info("User Data OK.");
      }
    });
  }

  esRutaMisCalificaciones() {



    return this.router.url.includes('/estudiante/mis-calificaciones/') ;
  }

  /*
  
    esRutaMisCalificaciones(): boolean {

    const rutaActual = this.router.url;
    console.log('rutaActual',rutaActual)
    
    const rutaEsperada = '/estudiante/mis-calificaciones';
    console.log('rutaEsperada',rutaEsperada)
    
    // Extraer el parámetro `cedulaCodificada` de la ruta actual
    const cedulaCodificada = this.route.snapshot.paramMap.get('cedulaCodificada');
    console.log('cedulaCodificada',cedulaCodificada)

    // Comprobar si la URL actual empieza con la ruta esperada y tiene la cédula codificada
    return rutaActual.startsWith(rutaEsperada) && !!cedulaCodificada;
  }
  
  */

  ngOnInit(): void {
    //this.esRutaMisCalificaciones();

    this.loginService.currentUserLoggedOn.subscribe({
      next: (userLoggedOn) => {
        this.userLoggedOn = userLoggedOn;
      }
    });
  }

  logout() {
    this.loginService.logout();
  }

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          titulo: `¿Confirmar cerrar sesión?`,
          mensaje: ``
        }
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
}
