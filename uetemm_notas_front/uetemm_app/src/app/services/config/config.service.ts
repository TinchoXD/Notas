import { Injectable } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { configRequest } from './configRequest';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private alertService: AlertService) {

  }

  getAllConfig(): Observable<any[]>{
    return this.http
    .get<any[]>(environment.urlApi + 'config' )
    .pipe(catchError(this.handleError));
  }

  
  postConfiguracion(configRequest: configRequest[]): Observable<any> {
    return this.http.post(environment.urlApi + 'config/guardarConfiguracion', configRequest).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }
}
