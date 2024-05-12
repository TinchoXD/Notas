import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  userLoggedOn: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}



  ngOnInit(): void {
    this.loginService.currentUserLoggedOn.subscribe({
      next:(userLoggedOn)=>{
        this.userLoggedOn=userLoggedOn;
      }
    })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/inicio']);
  }
}
