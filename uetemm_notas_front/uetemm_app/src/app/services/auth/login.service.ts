import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError,
  BehaviorSubject,
  tap,
  map,
} from 'rxjs';
import { User } from './user';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { AddUserRequest } from '../../pages/agregar-usuario/addUserRequest';
import { error } from 'jquery';
import { AlertType } from '../../shared/alert/alertType';
import { jwtDecode } from "jwt-decode";

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoggedOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  userId: number = 0;
  user_estado_usuario: number = 0;
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {
    this.currentUserLoggedOn = new BehaviorSubject<boolean>(
      sessionStorage.getItem('token') != null
    );
    this.currentUserData = new BehaviorSubject<String>(
      sessionStorage.getItem('token') || ''
    );
  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)) {
      this.alertService.showAlert(mensaje, type);
    }
  }

  login(credenciales: LoginRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlHost + '/auth/login', credenciales)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('token', userData.token);
          this.currentUserData.next(userData.token);
          this.currentUserLoggedOn.next(true);
          this.userId = JSON.parse(
            window.atob(userData.token.split('.')[1])
          ).userId;
          this.user_estado_usuario = JSON.parse(
            window.atob(userData.token.split('.')[1])
          ).user_estado_usuario;

          if (this.user_estado_usuario == 0) {
            this.showAlert('El usuario se encuentra deshabilitado.', 'error');
            throw new Error('El usuario se encuentra deshabilitado.');
          }
        }),
        map((userData) => userData.token),
        catchError(this.handleError)
      );
  }

  /*   register(addUserRequest: AddUserRequest): Observable<any>{
    console.log("addUserRequest:", addUserRequest)
    return this.http.post<any>(environment.urlHost + '/auth/register', addUserRequest).subscribe({
      next: () =>{

      }
    })
  } */

  register(addUserRequest: AddUserRequest) {
    console.log('addUserRequest:', addUserRequest);
    return this.http
      .post<any>(environment.urlHost + '/auth/register', addUserRequest)
      .subscribe({
        next: () => {
          this.showAlert('Usuario registrado', 'success');
        },
        error: () => {
          this.showAlert('Error al registrar usuario', 'error');
          console.log('Error: ', catchError(this.handleError));
        },
      });
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.currentUserLoggedOn.next(false);
    this.router.navigate(['/iniciar-sesion']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  get userLoggedOn(): Observable<boolean> {
    return this.currentUserLoggedOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }

  getuserIdsession(): number {
    return this.userId;
  }

  // Método para decodificar el token y obtener el payload
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  // Método para validar la caducidad del token
  validateToken(): boolean {
    const token = sessionStorage.getItem(this.tokenKey);

    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        if (decodedToken.exp < currentTime) {
          this.logout(); // Si el token ha expirado, hacer logout
          return false;
        }
        return true; // Token válido
      }
    }
    this.logout(); // Si no hay token o el token es inválido, hacer logout
    return false;
  }

  // Puedes llamar a esta función en los guards de tus rutas o en los componentes
  checkTokenAndRedirect(): void {
    if (!this.validateToken()) {
      this.router.navigate(['/iniciar-sesion']);
    }
  }
}
