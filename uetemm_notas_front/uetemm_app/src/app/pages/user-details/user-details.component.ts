import { Component } from '@angular/core';
import { User } from '../../services/auth/user';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../services/auth/login.service';
import { Catalogo } from '../../services/catalogo/catalogo';
import { CatalogoService } from '../../services/catalogo/catalogo.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  errorMessage: String = '';
  user?: User;
  userLoggedOn: boolean = false;
  editMode: boolean = false;
  
  catalogoEstadoCivil: Catalogo[] = [];
  selectedEstadoCivil: number = 0;
  


  userDetailsForm = this.formBuilder.group({
    id: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    country: ['', Validators.required],
    estadoCivil: ['', Validators.required],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private catalogoService: CatalogoService
  ) {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
        this.userDetailsForm.controls.id.setValue(userData.id.toString());
        this.userDetailsForm.controls.firstname.setValue(userData.firstname);
        this.userDetailsForm.controls.lastname.setValue(userData.lastname);
        this.userDetailsForm.controls.username.setValue(userData.username);
        this.userDetailsForm.controls.country.setValue(userData.country);
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

    this.catalogoService.getEstadoCivilLista().subscribe(
      (data: Catalogo[])=>{
        this.catalogoEstadoCivil = data;
        console.log(this.catalogoEstadoCivil)
      },
      (error) => {
        console.error('Error fetching catalogos', error);
      }
    );
  }

  get firstname() {
    return this.userDetailsForm.controls.firstname;
  }

  get lastname() {
    return this.userDetailsForm.controls.lastname;
  }

  get country() {
    return this.userDetailsForm.controls.country;
  }

  saveUserDetailsData() {
    if (this.userDetailsForm.valid) {
      this.userService
        .updateUser(this.userDetailsForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.userDetailsForm.value as unknown as User;
          },
          error: (errorData) => console.error(errorData),
        });
    }
  }
}
