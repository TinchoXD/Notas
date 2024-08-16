import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginError: string = "";
  loginForm: FormGroup;

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
    private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]]
    });
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
      alert("error en el formulario");
    }
  }


}
