import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userLoggedOn: boolean = false;
  errorMessage: String = '';
  user?: User;


  
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (errorData) => {
        console.log("usuario no loggeado.")
        this.errorMessage = errorData;
        this.router.navigate(['/iniciar-sesion']);
      },
      complete: ()=>{
        console.info("User Data OK.")
      }
    });

    
  }


  ngOnInit(): void {
    this.loginService.currentUserLoggedOn.subscribe({
      next: (userLoggedOn) => {
        this.userLoggedOn = userLoggedOn;
      },
    });
  }
  
}
