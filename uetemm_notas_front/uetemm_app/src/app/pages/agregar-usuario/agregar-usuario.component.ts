import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../services/alert/alert.service';
import { LoginService } from '../../services/auth/login.service';
import { AddUserRequest } from './addUserRequest';
import { first } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { ThemePalette } from '@angular/material/core';

interface Rol {
  value: string;
  viewValue: string;
}
type AlertType = 'success' | 'error';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {

  userForm: FormGroup;
  selectedRol?: string;
  roles: Rol[] = [
    {value: '1', viewValue: 'Administrador'},
    {value: '2', viewValue: 'Usuario'},
  ];
  errorMessage: String = 'Este campo es obligatorio.';
  existeUsername: boolean = false;
  color: ThemePalette = 'primary';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarUsuarioComponent>,
    private alertService: AlertService,
    private loginService: LoginService,
    private userService: UserService

  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email]],
      rol: ['', [Validators.required]]
    });
  }

  get nombres() {
    return this.userForm.controls['firstname'];
  } 

  get apellidos() {
    return this.userForm.controls['lastname'];
  } 

  get cedula() {
    return this.userForm.controls['username'];
  } 

  get email() {
    return this.userForm.controls['email'];
  } 

  get rol() {
    return this.userForm.controls['rol'];
  } 

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.userForm)
    if (this.userForm.valid) {
      this.loginService.register(this.userForm.value as AddUserRequest)
      this.dialogRef.close(this.userForm.value);
    } else {
      this.showAlert('Error al crear un nuevo usuario, valide los datos del formulario','error')

    }
  }

  verificarUserName(event: FocusEvent): void{

    const inputElement = event.target as HTMLInputElement;
    const username = inputElement.value;
    if(username==="")
      {
        return;
      }
    
    this.userService.verificarUserName(username).subscribe({
      next:(result)=>{
        this.existeUsername = result
      }
    })

  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)){
      this.alertService.showAlert(mensaje, type);
    }
  }

}
