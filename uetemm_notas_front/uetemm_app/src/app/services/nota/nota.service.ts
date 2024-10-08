import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  constructor(private http: HttpClient) {}

  getNotasByEstudiante(estu_id: number): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + 'notas/nota/estudiante/' + estu_id)
      .pipe(catchError(this.handleError));
  }

  getNotasByCursoProfesor(cupr_id: number): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + 'notas/nota/cursoProfesor/' + cupr_id)
      .pipe(catchError(this.handleError));
  }

  getNotaByEstudianteAndCursoProfesor(estu_id: number, cupr_id: number): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + 'notas/nota/estudiante/'+estu_id+'/cursoProfesor/'+cupr_id)
      .pipe(catchError(this.handleError));
  }

  saveNota(nota: any): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'notas/nota/guardarNota', nota)
      .pipe(catchError(this.handleError));
  }

  /*
    *===============================
    * Nota Animacion a la Lectura
    *===============================
    */

    getNotaAnimacionLecturaByEstudianteIdAndCursoId(estu_id: number, curs_id: number): Observable<any> {
      return this.http
        .get<any>(environment.urlApi + 'notas/notaAnimacionLectura/estudiante/'+estu_id+'/curso/'+curs_id)
        .pipe(catchError(this.handleError));
    }

     /*
    *===============================
    * Nota ACOMPAÑAMIENTO INTEGRAL EN EL AULA												
    *===============================
    */
    getNotaAcompaniamientoIntegralAulaByEstudianteIdAndCursoId(estu_id: number, curs_id: number): Observable<any> {
      return this.http
        .get<any>(environment.urlApi + 'notas/notaAcompaniamientoIntegralAula/estudiante/'+estu_id+'/curso/'+curs_id)
        .pipe(catchError(this.handleError));
    }

         /*
    *===============================
    * Nota COMPORTAMIENTO
    *===============================
    */
    getNotaComportamientoByEstudianteIdAndCursoId(estu_id: number, curs_id: number): Observable<any> {
      return this.http
        .get<any>(environment.urlApi + 'notas/notaComportamiento/estudiante/'+estu_id+'/curso/'+curs_id)
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
