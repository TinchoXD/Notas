import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {

  userLoggedOn: boolean = false;
  user?: User;
  errorMessage: String = '';


  constructor(private loginService: LoginService,
    private userService: UserService,
    public dialogo: MatDialog,
    public router: Router) {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info("User Data OK.")
      }
    });

    
  }

  /*     this.userService.getUser(this.loginService.userToken).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (errorData) => {
          console.log("usuario no loggeado.")
          this.errorMessage = errorData;
          this.router.navigate(['/iniciar-sesion']);
        },
        complete: ()=>{
          console.info("User Data OK.")
        }
      }); */



  ngOnInit(): void {
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
