import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uetemm_app';

}
