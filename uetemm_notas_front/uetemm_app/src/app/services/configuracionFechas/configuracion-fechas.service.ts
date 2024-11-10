import { Injectable } from '@angular/core';
import { AlertType } from '../../shared/alert/alertType';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ConfiguracionFechasRequest } from './configuracionFechasRequest';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionFechasService {

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getConfiguracionFechas(): Observable<any[]>{
    return this.http
    .get<any[]>(environment.urlApi + 'configuracionFechas' )
    .pipe(catchError(this.handleError));
  }



/*   postConfiguracionFechas(configuracionFechasRequest: ConfiguracionFechasRequest) {
    return this.http.post<any>(environment.urlApi + 'catalogos/agregarAsignatura', curso).subscribe({
      next: () => {
        this.showAlert('Asignatura guardada', 'success');
      },
      error: () => {
        this.showAlert('Error al agregar Asignatura', 'error');
      },
    });
  } */

  postConfiguracionFechas(configuracionFechasRequest: ConfiguracionFechasRequest[]): Observable<any> {
    return this.http.post(environment.urlApi + 'configuracionFechas/guardarConfiguracionFechas', configuracionFechasRequest).pipe(catchError(this.handleError))
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
