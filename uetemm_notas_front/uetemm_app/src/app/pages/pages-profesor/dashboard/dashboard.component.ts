import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { User } from '../../../services/auth/user';
import { UserService } from '../../../services/user/user.service';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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

  userData: any = null;
  private subscription: Subscription = new Subscription();

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    //console.log('this.userData',this.userData)

    

    this.loginService.currentUserLoggedOn.subscribe({
      next: (userLoggedOn) => {
        this.userLoggedOn = userLoggedOn;
      },
    });

    this.subscription = this.loginService.userData.subscribe((token) => {
      if (token) {
        // Decodifica el token para obtener la información del usuario
        this.userData = this.loginService.decodeToken(token);
        this.loginService.verificarCambioDeContrasenia(this.userData)

      }
    });

  }

  ngOnDestroy(): void {
    // Evitar posibles fugas de memoria desuscribiéndose
    this.subscription.unsubscribe();
  }

  click() {
    console.log('valor: ', this.value);
  }
}
