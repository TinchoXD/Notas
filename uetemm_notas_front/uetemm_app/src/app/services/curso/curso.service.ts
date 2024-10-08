import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CursoRequest } from './cursoRequest';
import { AlertType } from '../../shared/alert/alertType';
import { AlertService } from '../alert/alert.service';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getCursoByUserId(user_id: number): Observable<Curso[]> {
    return this.http
      .get<Curso[]>(environment.urlApi + 'cursos/curso/user/' + user_id)
      .pipe(catchError(this.handleError));
  }

  putCurso(curso: CursoRequest) {
    return this.http.post<any>(environment.urlApi + 'cursos/curso/agregarCurso', curso).subscribe({
      next: () => {
        alert('OK')
        this.showAlert('Curso Agregado', 'success');
      },
      error: () => {
        alert('ERROR')
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
