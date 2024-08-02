import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/auth/login.service';
import { CatalogoService } from '../../services/catalogo/catalogo.service';
import { User } from '../../services/auth/user';
import { Catalogo } from '../../services/catalogo/catalogo';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { merge, firstValueFrom} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { ThemePalette } from '@angular/material/core';



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
  requiredErrorMessage: String = 'Este campo es obligatorio.';
  user?: User;
  userLoggedOn: boolean = false;
  editMode: boolean = false;
  catalogoEstadoCivil: Catalogo[] = [];
  catalogoRelacionLaboral: Catalogo[] = [];
  catalogoJornadaLaboral: Catalogo[] = [];
  catalogoCategoria: Catalogo[] = [];
  catalogoGrupoEtnico: Catalogo[] = [];
  catalogoNacionalidadIndigena: Catalogo[] = [];
  catalogoNivelEducacion: Catalogo[] = [];
  catalogoActividadLaboral: Catalogo[] = [];
  catalogoNivel: Catalogo[] = [];
  catalogoSexo: Catalogo[] = [];

  habilitarNacionalidadIndigena: boolean = false;
  color: ThemePalette = 'primary';
  
  user_estado_usuario?: boolean;
  
  onGrupoEtnicoChange(event: any) {
    if(event == 38){
      this.habilitarNacionalidadIndigena=true
    }else{
      this.habilitarNacionalidadIndigena=false
      
    }
  }


  userDetailsForm: FormGroup = this.formBuilder.group({
    id: [''],
    firstname: ['', Validators.required],
    user_sexo: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    /*     estadoCivil: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }), */
    user_fecha_nacimiento:['', Validators.required],
    user_fecha_ingreso_magisterio:['', Validators.required],
    user_fecha_ingreso_institucion:['', Validators.required],
    user_relacion_laboral: ['', Validators.required],
    user_actividad_laboral: ['', Validators.required],
    user_nivel: ['', Validators.required],
 /*    user_relacion_laboral: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }), */
    user_jornada_laboral: ['', Validators.required],
    /* user_jornada_laboral: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }), */
    user_categoria: ['', Validators.required],
    /* user_categoria: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }), */
    user_grupo_etnico: ['', Validators.required],
    /* user_grupo_etnico: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    }), */
    user_nacionalidad_indigena: ['', Validators.required],
    /* user_grupo_etnico_otro: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required ]
    }), */
   /*  user_grupo_etnico_otro: [''], */
   
   user_nivel_educacion:['', Validators.required],
   user_titulo_senescyt:['', Validators.required],
    user_direccion:['', Validators.required],
  
    user_telefono_celular:['', Validators.required],
    user_telefono_convencional:['', Validators.required],
    user_email_personal:['', [Validators.required, Validators.email]],
    user_email_institucional:['', [Validators.required, Validators.email]],
    user_distrito:['', Validators.required],
    pais: ['', Validators.required],
    user_especialidad_accion_personal: ['', Validators.required],
    
    user_estado_usuario:['']
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
    this.loadCatalogoNacionalidadIndigena();
    this.loadCatalogoNivelEducaicon();
    this.loadCatalogoActividadLaboral();
    this.loadCatalogoNivel();
    this.loadCatalogoSexo();
    
    this.listenToUserLoginStatus();
    
    merge(this.firstname.statusChanges, this.firstname.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

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
          user_sexo: userData.user_sexo,
          username: userData.username,
          user_fecha_nacimiento: userData.user_fecha_nacimiento,
          user_fecha_ingreso: userData.user_fecha_nacimiento,
          user_fecha_ingreso_magisterio: userData.user_fecha_ingreso_magisterio,
          user_fecha_ingreso_institucion: userData.user_fecha_ingreso_institucion,
          user_actividad_laboral: userData.user_actividad_laboral,
          user_nivel: userData.user_nivel,
          estadoCivil: userData.estadoCivil,
/*           estadoCivil: {
            id: userData.estadoCivil.id.toString(),
            nombre: userData.estadoCivil.nombre,
            catalogoParent: userData.estadoCivil.catalogoParent.toString() || null
          }, */
          user_relacion_laboral: userData.user_relacion_laboral,
          /* user_relacion_laboral: {
            id: userData.user_relacion_laboral.id.toString(),
            nombre: userData.user_relacion_laboral.nombre,
            catalogoParent: userData.user_relacion_laboral.catalogoParent.toString() || null
          }, */
          user_jornada_laboral: userData.user_jornada_laboral,
          /* user_jornada_laboral: {
            id: userData.user_jornada_laboral.id.toString(),
            nombre: userData.user_jornada_laboral.nombre,
            catalogoParent: userData.user_jornada_laboral.catalogoParent.toString() || null
          }, */
          user_categoria: userData.user_categoria,
          /* user_categoria: {
            id: userData.user_categoria.id.toString(),
            nombre: userData.user_categoria.nombre,
            catalogoParent: userData.user_categoria.catalogoParent.toString() || null
          }, */
          user_grupo_etnico: userData.user_grupo_etnico,
          /* user_grupo_etnico: {
            id: userData.user_grupo_etnico.id.toString(),
            nombre: userData.user_grupo_etnico.nombre,
            catalogoParent: userData.user_grupo_etnico.catalogoParent.toString() || null
          }, */
          user_nacionalidad_indigena: userData.user_nacionalidad_indigena,
         /*  user_grupo_etnico_otro: {
            id: userData.user_grupo_etnico_otro.id.toString() || null,
            nombre: userData.user_grupo_etnico_otro.nombre || null,
            catalogoParent: userData.user_grupo_etnico_otro.catalogoParent.toString() || null
          }, */
          user_nivel_educacion: userData.user_nivel_educacion,
          user_titulo_senescyt: userData.user_titulo_senescyt,

          user_direccion: userData.user_direccion,
          user_telefono_celular: userData.user_telefono_celular,
          user_telefono_convencional: userData.user_telefono_convencional,
          user_email_personal: userData.user_email_personal,
          user_email_institucional: userData.user_email_institucional,
          user_distrito: userData.user_distrito,
          pais: userData.pais,
          user_especialidad_accion_personal: userData.user_especialidad_accion_personal,
          user_estado_usuario: userData.user_estado_usuario,


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

  private loadCatalogoSexo() {
    this.catalogoService.getSexoLista().subscribe({
      next: (data) => {
        this.catalogoSexo = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
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

  private loadCatalogoNacionalidadIndigena() {
    this.catalogoService.getNacionanlidadIndigenaLista().subscribe({
      next: (data) => {
        this.catalogoNacionalidadIndigena = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }

  private loadCatalogoNivelEducaicon() {
    this.catalogoService.getNivelEducacionLista().subscribe({
      next: (data) => {
        this.catalogoNivelEducacion = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }

  private loadCatalogoActividadLaboral() {
    this.catalogoService.getActividadLaboralLista().subscribe({
      next: (data) => {
        this.catalogoActividadLaboral = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos', error);
      }
    });
  }

  private loadCatalogoNivel() {
    this.catalogoService.getNivelLista().subscribe({
      next: (data) => {
        this.catalogoNivel = data;
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
  get sexo() {
    return this.userDetailsForm.controls['user_sexo'];
  }
  get username() {
    return this.userDetailsForm.controls['username'];
  }
  get estadoCivil() {
    return this.userDetailsForm.controls['estadoCivil'];
  }
  get fechaNacimiento() {
    return this.userDetailsForm.controls['user_fecha_nacimiento'];
  }
  get fechaIngresoMagisterio() {
    return this.userDetailsForm.controls['user_fecha_ingreso_magisterio'];
  }
  get fechaIngresoInstitucion() {
    return this.userDetailsForm.controls['user_fecha_ingreso_institucion'];
  }
  get actividadLaboral() {
    return this.userDetailsForm.controls['user_actividad_laboral'];
  }
  get nivel() {
    return this.userDetailsForm.controls['user_nivel'];
  }
  get direccion() {
    return this.userDetailsForm.controls['user_direccion'];
  }
  get telefonoCelular() {
    return this.userDetailsForm.controls['user_telefono_celular'];
  }
  get telefonoConvencional() {
    return this.userDetailsForm.controls['user_telefono_convencional'];
  }
  get emailPersonal() {
    return this.userDetailsForm.controls['user_email_personal'];
  }
  get emailInstitucional() {
    return this.userDetailsForm.controls['user_email_institucional'];
  }
  get distrito() {
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
  get nacionalidadIndigena() {
    return this.userDetailsForm.controls['user_nacionalidad_indigena'];
  }
  get nivelEducacion() {
    return this.userDetailsForm.controls['user_nivel_educacion'];
  }
  get tituloSenescyt() {
    return this.userDetailsForm.controls['user_titulo_senescyt'];
  }



  async saveUserDetailsData() {
    console.log("userDetailsForm", this.userDetailsForm);
    if (this.userDetailsForm.valid) {
      try {   
        await firstValueFrom(this.userService.updateUserByAdmin(this.userDetailsForm.value as unknown as User));
        this.editMode = false;
        this.user = this.userDetailsForm.value as unknown as User;
        this.showAlert("La información se ha guardado exitosamente.", "success");
        this.router.navigateByUrl('/informacion-personal');
      } catch (errorData) {
        console.error(errorData);
      }
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


  dialogoGuardarCambios(): void {
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

  dialogoDescartarCambios(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: {
          titulo: `¿Desea descartar los cambios?`,
          mensaje: ``
        }
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //alert("aaa");
          this.refresh();
          
          //alert("bbb c");
        } else {
          this.dialogo.closeAll();
        } 
      });
  }

  updateErrorMessage() {
    if (this.firstname.hasError('required')) {
      this.errorMessage = 'Este campo es obligatorio.';
    } else {
      this.errorMessage = '';
    }
  }

  refresh(): void {
    window.location.reload();
}
}
