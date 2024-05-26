import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/auth/login.service';
import { CatalogoService } from '../../services/catalogo/catalogo.service';
import { User } from '../../services/auth/user';
import { Catalogo } from '../../services/catalogo/catalogo';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';

type AlertType = 'success' | 'error';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  errorMessage: String = '';
  user?: User;
  userLoggedOn: boolean = false;
  editMode: boolean = false;
  catalogoEstadoCivil: Catalogo[] = [];
  catalogoRelacionLaboral: Catalogo[] = [];
  catalogoJornadaLaboral: Catalogo[] = [];
  catalogoCategoria: Catalogo[] = [];
  catalogoGrupoEtnico: Catalogo[] = [];
  catalogoGrupoEtnicoOtro: Catalogo[] = [];
  otroGrupoEtnico: boolean = false;
  //selectedEstadoCivil?: Catalogo;





  userDetailsForm: FormGroup = this.formBuilder.group({
    id: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    estadoCivil: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }),
    user_relacion_laboral: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }),
    user_jornada_laboral: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }),
    user_categoria: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }),
    user_grupo_etnico: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }),
    user_grupo_etnico_otro: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }),
    user_direccion:['', Validators.required],
    user_telefono_celular:['', Validators.required],
    user_telefono_convencional:['', Validators.required],
    user_email_personal:['', [Validators.required, Validators.email]],
    user_email_institucional:['', [Validators.required, Validators.email]],
    user_distrito:['', Validators.required],
    pais: ['', Validators.required]
  });


  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private catalogoService: CatalogoService,
    public dialogo: MatDialog,
    private alertService: AlertService,
    private router: Router
  ) {
    this.loadUserData();
    this.loadCatalogoEstadoCivil();
    this.loadCatalogoRelacionLaboral();
    this.loadCatalogoJornadaLaboral();
    this.loadCatalogoCategoria();
    this.loadCatalogoGrupoEtnico();
    this.loadCatalogoGrupoEtnicoOtro();
    this.listenToUserLoginStatus();
  }
  
  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)){
      this.alertService.showAlert(mensaje, type);
    }
  }



  private loadUserData() {
    this.userService.getUser(this.loginService.userToken).subscribe({
      
      next: (userData) => {
        this.user = userData;
        console.log("user DATA", userData)
        this.userDetailsForm.patchValue({
          id: userData.id.toString(),
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          estadoCivil: {
            id: userData.estadoCivil.id.toString(),
            nombre: userData.estadoCivil.nombre,
            catalogoParent: userData.estadoCivil.catalogoParent.toString() || null
          },
          user_relacion_laboral: {
            id: userData.user_relacion_laboral.id.toString(),
            nombre: userData.user_relacion_laboral.nombre,
            catalogoParent: userData.user_relacion_laboral.catalogoParent.toString() || null
          },
          user_jornada_laboral: {
            id: userData.user_jornada_laboral.id.toString(),
            nombre: userData.user_jornada_laboral.nombre,
            catalogoParent: userData.user_jornada_laboral.catalogoParent.toString() || null
          },
          user_categoria: {
            id: userData.user_categoria.id.toString(),
            nombre: userData.user_categoria.nombre,
            catalogoParent: userData.user_categoria.catalogoParent.toString() || null
          },
          user_grupo_etnico: {
            id: userData.user_grupo_etnico.id.toString(),
            nombre: userData.user_grupo_etnico.nombre,
            catalogoParent: userData.user_grupo_etnico.catalogoParent.toString() || null
          },
          user_grupo_etnico_otro: {
            id: userData?.user_grupo_etnico_otro.id.toString(),
            nombre: userData?.user_grupo_etnico_otro.nombre,
            catalogoParent: userData?.user_grupo_etnico_otro.catalogoParent.toString() || null
          },
          user_direccion: userData.user_direccion,
          user_telefono_celular: userData.user_telefono_celular,
          user_telefono_convencional: userData.user_telefono_convencional,
          user_email_personal: userData.user_email_personal,
          user_email_institucional: userData.user_email_institucional,
          user_distrito: userData.user_distrito,
          pais: userData.pais
          
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

  private loadCatalogoEstadoCivil() {
    this.catalogoService.getEstadoCivilLista().subscribe({
      next: (data) => {
        this.catalogoEstadoCivil = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }
  private loadCatalogoRelacionLaboral() {
    this.catalogoService.getRelacionLaboralLista().subscribe({
      next: (data) => {
        this.catalogoRelacionLaboral = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }
  private loadCatalogoJornadaLaboral() {
    this.catalogoService.getJornadaLaboralLista().subscribe({
      next: (data) => {
        this.catalogoJornadaLaboral = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }

  private loadCatalogoCategoria() {
    this.catalogoService.getCategoriaLista().subscribe({
      next: (data) => {
        this.catalogoCategoria = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }

  private loadCatalogoGrupoEtnico() {
    this.catalogoService.getGrupoEtnicoLista().subscribe({
      next: (data) => {
        this.catalogoGrupoEtnico = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }

  private loadCatalogoGrupoEtnicoOtro() {
    this.catalogoService.getGrupoEtnicoOtroLista().subscribe({
      next: (data) => {
        this.catalogoGrupoEtnicoOtro = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }

  private listenToUserLoginStatus() {
    this.loginService.userLoggedOn.subscribe({
      next: (userLoggedOn) => {
        this.userLoggedOn = userLoggedOn;
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
  get estadoCivil() {
    return this.userDetailsForm.controls['estadoCivil'];
  }
  get user_direccion() {
    return this.userDetailsForm.controls['user_direccion'];
  }
  get user_telefono_celular() {
    return this.userDetailsForm.controls['user_telefono_celular'];
  }
  get user_telefono_convencional() {
    return this.userDetailsForm.controls['user_telefono_convencional'];
  }
  get user_email_personal() {
    return this.userDetailsForm.controls['user_email_personal'];
  }
  get user_email_institucional() {
    return this.userDetailsForm.controls['user_email_institucional'];
  }
  get user_distrito() {
    return this.userDetailsForm.controls['user_distrito'];
  }
  get pais() {
    return this.userDetailsForm.controls['pais'];
  }
  get relacionLaboral() {
    return this.userDetailsForm.controls['user_relacion_laboral'];
  }
  get jornadaLaboral() {
    return this.userDetailsForm.controls['user_jornada_laboral'];
  }
  get categoria() {
    return this.userDetailsForm.controls['user_categoria'];
  }
  get grupoEtnico() {
    return this.userDetailsForm.controls['user_grupo_etnico'];
  }
  get grupoEtnicoOtro() {
    return this.userDetailsForm.controls['user_grupo_etnico'];
  }



  saveUserDetailsData() {
    if (this.userDetailsForm.valid) {
      this.userService.updateUser(this.userDetailsForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.userDetailsForm.value as unknown as User;
            this.showAlert("La información se ha guardado exitosamente.", "success");
            this.router.navigateByUrl('/informacion-personal');
          },
          error: (errorData) => console.error(errorData),
        });
      } else {
      this.showAlert("Error al guardar la información, valide los datos ingresados.", "error");
      this.markFormGroupTouched(this.userDetailsForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }


  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          titulo: `¿Desea actualizar la información?`,
          mensaje: ``
        }
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //alert("aaa");
          this.saveUserDetailsData();
          
          //alert("bbb c");
        } else {
          this.dialogo.closeAll();
        } 
      });
  }
}
