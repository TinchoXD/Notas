import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../../services/user/user.service';
import { LoginService } from '../../../services/auth/login.service';
import { User } from '../../../services/auth/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { PasswordRequest } from '../cambiar-contrasena/passwordRequest';
import { AlertService } from '../../../services/alert/alert.service';
import { Curso } from '../../../services/curso/curso';
import { AgregarCursoComponent } from '../curso/dialogo-curso/agregar-curso.component';
import { CursoService } from '../../../services/curso/curso.service';
import { AlertType } from '../../../shared/alert/alertType';
import { CursoProfesorService } from '../../../services/cursoProfesor/curso-profesor.service';
import { DialogoCursoProfesorComponent } from './dialogoCursoProfesor/dialogo-curso-profesor.component';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

interface rol{
  value: number,
  nombre: string,
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
})
export class EditarUsuarioComponent implements OnInit {
  agregarCursoProfesorDialog: boolean = false;
  user?: User;
  userId: number = 0;
  userCI: string = '';
  user_estado_usuario?: boolean;
  requiredErrorMessage: String = 'Este campo es obligatorio.';
  onIcion: string = 'pi pi-check';

  roles: rol[] = []

  cursosProfesor!: any[];
  cursoProfesor!: any;

  submitted: boolean = false;

  color: ThemePalette = 'primary';
  errorMessage: String = '';
  errorRequiredMessage: String = 'Este campo es obligatorio.';

  checked: boolean = true;
  value: number = 50;

  modalVisible = true;

  userDataToken!: any
  /* public resetPasswordRequest: PasswordRequest */
  public resetPasswordRequest: PasswordRequest = {
    id: 0,
    password: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    public dialogo: MatDialog,
    private alertService: AlertService,
    private router: Router,
    private cursoService: CursoService,
    private dialog: MatDialog,
    private cursoProfesorService: CursoProfesorService
  ) {}

  userDetailsForm: FormGroup = this.formBuilder.group({
    id: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    rol: ['', Validators.required],
    user_estado_usuario: [''],
  });

  ngOnInit(): void {

    this.loginService.userData.subscribe({
      next:(userDataToken)=>{
        this.userDataToken = this.loginService.decodeToken(userDataToken)
        console.log('aasdasdasdasd', this.userDataToken)
        if(this.userDataToken.role === 'ADMIN'){
          this.modalVisible = false
        }else{
        }
      },

    })

    this.roles=[
      {value: 1, nombre: 'Administrador'},
      {value: 2, nombre: 'Docente'},
      {value: 3, nombre: 'Secretaria'},
    ]
    this.activatedRoute.params.subscribe((params) => {
      this.userId = +params['id']; // El signo '+' convierte el string a número
      console.log(this.userId);
    });

    this.cursoProfesorService
      .getAllCursoProfesorByProfesorId(this.userId)
      .subscribe({
        next: (data) => {
          this.cursosProfesor = data;
          console.log('cursosProfesor', this.cursosProfesor);
        },
      });

    this.loadUserData();
  }

  private loadUserData() {
    this.userService.getUserById(this.userId).subscribe({
      next: (userData) => {
        this.user = userData;
        this.userCI = userData.username;

        console.log('role', userData)

        this.userDetailsForm.patchValue({
          id: userData.id.toString(),
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          user_estado_usuario: userData.user_estado_usuario,
          rol: userData.role,
        });
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data loaded');
      },
    });
  }

  get firstname() {
    return this.userDetailsForm.controls['firstname'];
  }
  get lastname() {
    return this.userDetailsForm.controls['lastname'];
  }
  get username() {
    return this.userDetailsForm.controls['username'];
  }
  get estado_usuario() {
    return this.userDetailsForm.controls['user_estado_usuario'];
  }
  get rol() {
    return this.userDetailsForm.controls['rol'];
  }

  dialogoResetearContrasenia(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          icon: `warning`,
          titulo: `¿Desea restablecer la contraseña del usuario?`,
          mensaje: `La nueva contraseña será el número de cédula del usuario.`,
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
         
          this.resetearContrasenia();
          
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
          mensaje: `Se actualizará la información del usuario.`,
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          if (this.userDetailsForm.valid) {
            console.log('this.userDetailsForm',this.userDetailsForm)
            this.guardarInformacionUsuario();
          } else {
            this.showAlert(
              'Error al guardar los datos, Verifique los campos del formulario.',
              'error'
            );
          }
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
          mensaje: ``,
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.router.navigateByUrl('/administracion-usuarios');
        } else {
          this.dialogo.closeAll();
        }
      });
  }

  dialogAgregarCursoProfesor() {
    this.agregarCursoProfesorDialog = true;
    this.submitted = false;
    this.cursoProfesor = {};

    const dialogRef = this.dialog.open(DialogoCursoProfesorComponent, {
     
      width: '1000px',
      data: { user_id: this.userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        console.log('result',result)

        this.cursoProfesorService
          .getAllCursoProfesorByProfesorId(this.userId)
          .subscribe({
            next: (cursosProfesor) => {
              this.cursosProfesor = cursosProfesor;
            },
          });
      }
    });
  }

  editarCursoProfesor(cursoProfesorEdit: any) {
    this.cursoProfesor = cursoProfesorEdit;
    this.submitted = false;

    const dialogRef = this.dialog.open(DialogoCursoProfesorComponent, {
      width: '1000px',
      data: { cursoProfesorEdit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cursoProfesorService
          .getAllCursoProfesorByProfesorId(this.userId)
          .subscribe({
            next: (cursosProfesor) => {
              this.cursosProfesor = cursosProfesor;
            },
          });
      }
    });
  }

  async resetearContrasenia() {
    this.resetPasswordRequest = {
      id: this.userId,
      password: this.userCI,
    };
    await firstValueFrom(
      this.userService.resetUserPassword(this.resetPasswordRequest)
    );
    this.showAlert('Se ha restabelcido la contraseña del usuario.', 'success');
  }

  guardarInformacionUsuario() {
    if (this.userDetailsForm.valid) {
      this.userService
        .updateUserByAdmin(this.userDetailsForm.value as User)
        .subscribe({
          next: () => {
            this.showAlert(
              'La información se ha guardado con éxito.',
              'success'
            );
          },
        });
    }
  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)) {
      this.alertService.showAlert(mensaje, type);
    }
  }
}
