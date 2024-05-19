import { Component } from '@angular/core';
import { User } from '../../services/auth/user';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../services/auth/login.service';
import { PasswordRequest } from './passwordRequest';

import { MatDialog } from "@angular/material/dialog";
import { DialogoConfirmacionComponent } from '../../shared/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css'],
})
export class CambiarContrasenaComponent {
  userLoggedOn: boolean = false;
  hidePass: boolean = true;
  inputPassType: string = 'password';
  user?: User;
  errorMessage: string = '';

  updatePasswordForm = this.formBuilder.group({
    id: [''],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[0-9])/)]],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public dialogo: MatDialog
  ) {

    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
        this.updatePasswordForm.controls.id.setValue(userData.id.toString());

      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data ok');
      },
    });

    this.loginService.userLoggedOn.subscribe({
      next: (userLoggedOn) => {
        this.userLoggedOn = userLoggedOn;
      },
    });
  }



  get password() {
    return this.updatePasswordForm.controls.password;
  }

  get id() {
    return this.updatePasswordForm.controls.id;
  }


  updatePassword() {
    if (this.updatePasswordForm.valid) {
      this.userService
        .updateUserPassword(this.updatePasswordForm.value as unknown as PasswordRequest)
        .subscribe({
          next: () => {
            this.loginService.logout();
            // this.editMode = false;
            // this.user = this.registerForm.value as unknown as PasswordRequest;
          },
          error: (errorData) => console.error(errorData),
        });
    } else {


    }
  }

  hidePassToggle() {
    console.log(this.password)
    if (this.hidePass) {
      this.hidePass = false
      this.inputPassType = "text";
    } else {
      this.hidePass = true
      this.inputPassType = "password";

    }
  }

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          titulo: `¿Está seguro que desea cambiar su contraseña?`,
          mensaje: `Al hacerlo, su sesión se cerrará para aplicar los cambios.`
        }
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.updatePassword();
        } else {
          this.dialogo.closeAll();
        }
      });
  }

}
