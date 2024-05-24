import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/auth/login.service';
import { CatalogoService } from '../../services/catalogo/catalogo.service';
import { User } from '../../services/auth/user';
import { Catalogo } from '../../services/catalogo/catalogo';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../shared/dialogo-confirmacion/dialogo-confirmacion.component';

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
  selectedEstadoCivil?: Catalogo;

  pruebaCatalogo: Catalogo = { id: 2, nombre: "asda", catalogoParent: 1 }

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
    public dialogo: MatDialog
  ) {
    this.loadUserData();
    this.loadCatalogoEstadoCivil();
    this.listenToUserLoginStatus();
  }

  private loadUserData() {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
        console.log(userData)
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
          user_direccion: userData.user_direccion,
          user_telefono_celular: userData.user_telefono_celular,
          user_telefono_convencional: userData.user_telefono_convencional,
          user_email_personal: userData.user_email_personal,
          user_email_institucional: userData.user_email_institucional,
          user_distrito: userData.user_email_institucional,
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



  saveUserDetailsData() {
    if (this.userDetailsForm.valid) {
      this.userService.updateUser(this.userDetailsForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.userDetailsForm.value as unknown as User;
          },
          error: (errorData) => console.error(errorData),
        });
    } else {
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
          this.saveUserDetailsData();
        } else {
          this.dialogo.closeAll();
        }
      });
  }
}
