import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userLoggedOn: boolean = false;
  errorMessage: String = '';
  user?: User;
  value!: number;

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}
  
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
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
  

  click(){
    console.log("valor: ", this.value)

  }

}
