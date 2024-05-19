import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoggedOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  userId: number = 0;
  private tokenKey = 'token';


  constructor(private http: HttpClient, private router: Router) {
    this.currentUserLoggedOn = new BehaviorSubject<boolean>(
      sessionStorage.getItem('token') != null
    );
    this.currentUserData = new BehaviorSubject<String>(
      sessionStorage.getItem('token') || ''
    );
  }

  

  login(credenciales: LoginRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlHost + '/auth/login', credenciales)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('token', userData.token);
          this.currentUserData.next(userData.token);
          this.currentUserLoggedOn.next(true);
          this.userId = JSON.parse(window.atob(userData.token.split('.')[1])).userId;
        }),
        map((userData) => userData.token),
        catchError(this.handleError),
      );
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

  get userToken():String{
    return this.currentUserData.value;
  }

  getuserIdsession():number{
    return this.userId
  }

}
