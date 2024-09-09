import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { Codec } from '../../services/codec/codec';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  codec: Codec;

  loginError: string = "";
  loginForm: FormGroup;
  estudiante: any;
  errorMessage: string = '';

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  ngOnInit(): void {
    this.loginForm.clearValidators();
    this.loginService.logout();
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private estudianteService: EstudianteService,
    private userService: UserService,
    private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]]
    });
    this.codec = new Codec(); 
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log("userData", userData)
          if (userData.user_status) {

          }
        },
        error: (errorData) => {

          console.log(errorData)
          this.loginError = errorData
        },
        complete: () => {

          console.info("Login Completo")
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
     
    }
  }

  async verCalificaciones(){
    const { value: cedula } = await Swal.fire({
      title: 'Buscar estudiante',
      input: 'text',
      inputLabel: 'cédula/pasaporte',
      inputPlaceholder: 'Ingrese su número de cédula / pasaporte',
      inputAttributes: {
        maxlength: '15',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
    });

    if (cedula) {

      this.estudianteService.getEstudianteByCedula(cedula).subscribe({
        next:async (estudiante)=>{
          if(estudiante){
            
            this.estudiante = estudiante
            const { value: palabraSeguridad } = await Swal.fire({
              title: 'Palabra de seguridad',
              input: 'text',
              inputLabel: 'Ingrese su palabra de seguridad',
              inputPlaceholder: 'Palabra de seguridad',
              inputAttributes: {
                maxlength: '10',
                autocapitalize: 'off',
                autocorrect: 'off',
              },
            });

            if (palabraSeguridad === this.estudiante.palabraSeguridad) {

              this.router.navigateByUrl('/estudiante/mis-calificaciones/'+this.codec.encode(this.estudiante.cedula));

            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al validar la palabra de seguridad del estudiante!",
              });
            }
            
            
          }else{
            Swal.fire('No se encontró Estudiante');
          }

        }
      })

    }
  }

}
