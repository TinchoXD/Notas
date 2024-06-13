import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environment.development';
import { PasswordRequest } from '../../pages/cambiar-contrasena/passwordRequest';

import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  userLoggedOn: boolean = false;
  id: string = ""

  ngOnInit(): void {
    this.loginService.currentUserLoggedOn.subscribe({
      next: (userLoggedOn) => {
        console.log("oninit")
        this.userLoggedOn = userLoggedOn;
      },
    });
  }

  constructor(private http:HttpClient, private loginService: LoginService, private router: Router) { }

  /* getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"/user/"+id).pipe(
      catchError(this.handleError
      )
    )
  } */
  getUser(token:String):Observable<User>{
    try {
      this.id = JSON.parse(window.atob(token.split('.')[1])).userId;
    } catch (error) {
      console.log('no existe el totken en la sesión actual')
    }
    return this.http.get<User>(environment.urlApi+"users/user/"+this.id).pipe(catchError(this.handleError)
    )
  }

  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(environment.urlApi+"administracionUsuarios/getAll").pipe(catchError(this.handleError))
  }

  updateUser(userRequest:User):Observable<any>
  {
    console.log('AAAAAAAAAAAAAAA', userRequest)
    return this.http.put(environment.urlApi+"users/updateUser", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  updateUserPassword(passwordRequest:PasswordRequest):Observable<any>
  {
    return this.http.put(environment.urlApi+"users/user/cambiarContrasena", passwordRequest).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ', error
      );
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }




}
