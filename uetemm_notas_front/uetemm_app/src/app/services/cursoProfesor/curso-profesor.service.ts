import { Injectable } from '@angular/core';
import { AlertType } from '../../shared/alert/alertType';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Injectable({
  providedIn: 'root'
})
export class CursoProfesorService {

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getAllCursoProfesor(): Observable<any[]>{
    return this.http
    .get<any[]>(environment.urlApi + 'cursosProfesor/all' )
    .pipe(catchError(this.handleError));
  }

  getAllCursoProfesorByProfesorId(user_id: number): Observable<any[]>{
    return this.http
    .get<any[]>(environment.urlApi + 'cursosProfesor/cursoProfesor/user/'+ user_id )
    .pipe(catchError(this.handleError));
  }

  putCursoProfesor(cursoProfesor: any){
    return this.http.post<any>(environment.urlApi + 'cursosProfesor/cursoProfesor/agregarCursoProfesor', cursoProfesor).subscribe({
      next: () => {
        this.showAlert('Curso guardado', 'success');
      },
      error: () => {
        this.showAlert('Error al registrar Curso', 'error');
        console.log('Error: ', catchError(this.handleError));
      },
    });

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
