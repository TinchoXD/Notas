import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NovedadCursoEstudianteService {
  constructor(private http: HttpClient) {}

  getNovedadesByCursoAndEstudianteListDTO(
    curs_id: number,
    estu_id: number
  ): Observable<any> {
    return this.http
      .get<any>(
        environment.urlApi +
          'novedades/dto/curso/' +
          curs_id +
          '/estudiante/' +
          estu_id
      )
      .pipe(catchError(this.handleError));
  }

  getNovedadesByEstudiante(estu_id: number): Observable<any> {
    return this.http
      .get<any>(
        environment.urlApi +
          'novedades/estudiante/' +
          estu_id
      )
      .pipe(catchError(this.handleError));
  }

  registrarNovedadEstudiante(novedad: any): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'novedades/registrar-novedad', novedad)
      .pipe(catchError(this.handleError));
  }

  eliminarNovedadEstudiante(novedad: any): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'novedades/eliminar-novedad', novedad)
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
}
