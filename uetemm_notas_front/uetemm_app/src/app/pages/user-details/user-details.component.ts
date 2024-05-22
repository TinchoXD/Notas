import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/auth/login.service';
import { CatalogoService } from '../../services/catalogo/catalogo.service';
import { User } from '../../services/auth/user';
import { Catalogo } from '../../services/catalogo/catalogo';

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
    pais: ['', Validators.required],
    estadoCivil: this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      catalogoParent: ['', Validators.required]
    })
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private catalogoService: CatalogoService
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
          pais: userData.pais,
          estadoCivil: {
            id: userData.estadoCivil.id.toString(),
            nombre: userData.estadoCivil.nombre,
            catalogoParent: userData.estadoCivil.catalogoParent.toString() || null
          }
        });
        this.selectedEstadoCivil =  this.selectedEstadoCivil = {
          id: userData.estadoCivil.id,
          nombre: userData.estadoCivil.nombre,
          catalogoParent: userData.estadoCivil.catalogoParent
        };
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

  get pais() {
    return this.userDetailsForm.controls['pais'];
  }

  saveUserDetailsData() {
    if (this.userDetailsForm.valid) {
      alert("form valido")
      this.userService.updateUser(this.userDetailsForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.userDetailsForm.value as unknown as User;
          },
          error: (errorData) => console.error(errorData),
        });
    } else {

      alert("form NO valido")
    }
  }
}
