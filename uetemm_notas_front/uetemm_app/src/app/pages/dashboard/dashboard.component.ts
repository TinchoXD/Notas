import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';

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
    private userService: UserService
  ) {
    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
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
