import { Component } from '@angular/core';
import { User } from '../../services/auth/user';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../services/auth/login.service';

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

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['', Validators.required],
    country:['',Validators.required]
  })

  constructor(private userService:UserService, private formBuilder:FormBuilder, private loginService:LoginService  ){
    this.userService.getUser(this.loginService.userId).subscribe({
      next: (userData) => {
        this.user=userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue( userData.firstname);
        this.registerForm.controls.lastname.setValue( userData.lastname);
        this.registerForm.controls.country.setValue( userData.country);
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })

    this.loginService.userLoggedOn.subscribe({
      next:(userLoggedOn) => {
        this.userLoggedOn=userLoggedOn;
      }
    })
    
  }

  get firstname()
  {
    return this.registerForm.controls.firstname;
  }

  get lastname()
  {
    return this.registerForm.controls.lastname;
  }

  get country()
  {
    return this.registerForm.controls.country;
  }

  saveUserDetailsData()
  {
    if (this.registerForm.valid)
    {
      console.log(this.registerForm);
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }

}
