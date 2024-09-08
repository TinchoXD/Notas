import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../../../services/auth/login.service';
import { LoginRequest } from '../../../../services/auth/loginRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-calificaciones',
  templateUrl: './mis-calificaciones.component.html',
  styleUrl: './mis-calificaciones.component.css',
})
export class MisCalificacionesComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  async ngOnInit(): Promise<void> {
    const { value: password } = await Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: '10',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
    });
    if (password) {
      Swal.fire(`Entered password: ${password}`);
    }
  }
}
