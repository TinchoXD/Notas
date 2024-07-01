import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { PasswordRequest } from '../cambiar-contrasena/passwordRequest';
import { AlertService } from '../../services/alert/alert.service';

type AlertType = 'success' | 'error';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  user?: User;
  userId: number = 0;
  userCI: string = '';
  user_estado_usuario?: boolean;

  color: ThemePalette = 'primary';
  errorMessage: String = '';

  /* public resetPasswordRequest: PasswordRequest */
  public resetPasswordRequest: PasswordRequest = {
    id: 0,
    password: ""
  };


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    public dialogo: MatDialog,
    private alertService: AlertService,
    private router: Router

  ) {
  }

  userDetailsForm: FormGroup = this.formBuilder.group({
    user_id: [''],
    user_firstname: [''],
    user_lastname: [''],
    user_username: [''],
    user_estado_usuario: ['']

  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = +params['id']; // El signo '+' convierte el string a número
      console.log(this.userId);

    });
    this.loadUserData();
  }

  private loadUserData() {
    this.userService.getUserById(this.userId).subscribe({
      next: (userData) => {
        this.user = userData;
        this.userCI = userData.username

        this.userDetailsForm.patchValue({
          user_id: userData.id.toString(),
          user_firstname: userData.firstname,
          user_lastname: userData.lastname,
          user_username: userData.username,
          user_estado_usuario: userData.user_estado_usuario,

        })

      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data loaded');
      }
    })
  }

  get firstname() {
    return this.userDetailsForm.controls['user_firstname'];
  }
  get lastname() {
    return this.userDetailsForm.controls['user_lastname'];
  }
  get username() {
    return this.userDetailsForm.controls['user_username'];
  }

  dialogoResetearContrasenia(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          icon: `warning`,
          titulo: `¿Desea restablecer la contraseña del usuario?`,
          mensaje: `La nueva contraseña será el número de cédula del usuario.`
        }
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //alert("aaa");
          this.resetearContrasenia();
          //alert("bbb c");
        } else {
          this.dialogo.closeAll();
        }
      });
  }

  dialogoGuardarInformacion(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          icon: `warning`,
          titulo: `¿Desea guardar la información?`,
          mensaje: `Se actualizará la información del usuario.`
        }
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.guardarInformacionUsuario();
        } else {
          this.dialogo.closeAll();
        }
      });
  }

  dialogoCancelar(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          icon: `warning`,
          titulo: `¿Desea descartar los cambios?`,
          mensaje: ``
        }
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.router.navigateByUrl("/administracion-usuarios")
        } else {
          this.dialogo.closeAll();
        }
      });
  }




  async resetearContrasenia() {
    this.resetPasswordRequest = {
      id: this.userId,
      password: this.userCI
    };
    await firstValueFrom(this.userService.resetUserPassword(this.resetPasswordRequest))
    this.showAlert("Se ha restabelcido la contraseña del usuario.", "success")
  }

  
  async guardarInformacionUsuario() {
    /* await firstValueFrom() */
    this.showAlert("La información se ha guardado con éxito.", "success")
  }
  
  
  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)){
      this.alertService.showAlert(mensaje, type);
    }
  }

}
