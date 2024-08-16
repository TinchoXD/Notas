import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AlertType } from '../../shared/alert/alertType';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getAllEstudiantes(): Observable<any[]>{
    return this.http
    .get<any[]>(environment.urlApi + 'estudiantes/all' )
    .pipe(catchError(this.handleError));
  }

  getEstudianteById(estudiante_id: number): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + 'estudiantes/estudiante/' + estudiante_id)
      .pipe(catchError(this.handleError));
  }
  
  getEstudiantesByCursoId(curso_id: number): Observable<any[]> {
    return this.http
      .get<any[]>(environment.urlApi + 'estudiante/curso/' + curso_id)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)) {
      this.alertService.showAlert(mensaje, type);
    }
  }
}
