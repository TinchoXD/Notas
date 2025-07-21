import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CursoRequest } from './cursoRequest';
import { AlertType } from '../../shared/alert/alertType';
import { AlertService } from '../alert/alert.service';
import { CursoUpdateRequest } from './cursoUpdateRequest';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private http: HttpClient, private alertService: AlertService) {}
private cursoId!: number;

  setCursoId(id: number) {
    this.cursoId = id;
  }

  getCursoId(): number {
    return this.cursoId;
  }
  
  getCurso(): Observable<Curso[]> {
    return this.http
      .get<Curso[]>(environment.urlApi + 'cursos/all')
      .pipe(catchError(this.handleError));
  }

  getCursoById(curs_id: number): Observable<Curso> {
    return this.http
      .get<Curso>(environment.urlApi + 'cursos/curso/' + curs_id)
      .pipe(catchError(this.handleError));
  }

  /*   getCursosActivos(): Observable<Curso[]>{
    return this.http
    .get<Curso[]>(environment.urlApi + 'cursos/allActive' )
    .pipe(catchError(this.handleError));
  } */

  getCursosActivos(): Observable<any[]> {
    return this.http
      .get<any[]>(environment.urlApi + 'cursos/allActive')
      .pipe(catchError(this.handleError));
  }

  getCursoByUserId(user_id: number): Observable<Curso[]> {
    return this.http
      .get<Curso[]>(environment.urlApi + 'cursos/curso/user/' + user_id)
      .pipe(catchError(this.handleError));
  }

  getCursoByCodigo(codigo: string): Observable<boolean> {
    return this.http
      .get<boolean>(environment.urlApi + 'cursos/curso/codigo/' + codigo)
      .pipe(catchError(this.handleError));
  }

  delCurso(curso: any): Observable<Curso[]> {
    return this.http
      .post<Curso[]>(environment.urlApi + 'cursos/curso/deleteCurso', curso)
      .pipe(catchError(this.handleError));
  }

  putCurso(curso: CursoRequest) {
    return this.http
      .post<any>(environment.urlApi + 'cursos/curso/agregarCurso', curso)
      .subscribe({
        next: () => {
          this.showAlert('Curso guardado', 'success');
        },
        error: () => {
          this.showAlert('Error al registrar Curso', 'error');
        },
      });
  }

  updateCurso(curso: CursoUpdateRequest) {
    return this.http.post<any>(
      environment.urlApi + 'cursos/curso/actualizarCurso',
      curso
    );
  }

  updateTutorCurso(curso: CursoUpdateRequest) {
    return this.http.post<any>(
      environment.urlApi + 'cursos/curso/actualizarTutorCurso',
      curso
    );
  }

  eliminarTutorCurso(curso: CursoUpdateRequest) {

    return this.http.post<any>(
      environment.urlApi + 'cursos/curso/eliminarTutorCurso',
      curso
    );
  }

  validaAplicaSupletorio(curso: any): boolean {
    if (curso.nivel.nombre === 'Educación General Básica') {
      if (
        curso.grado.nombre === '4to' ||
        curso.grado.nombre === '5to' ||
        curso.grado.nombre === '6to' ||
        curso.grado.nombre === '7mo' ||
        curso.grado.nombre === '8vo' ||
        curso.grado.nombre === '9no' ||
        curso.grado.nombre === '10mo'
      ) {
        return true;
      } else {
        return false;
      }
    } else if (curso.nivel.nombre === 'Bachillerato Técnico') {
      return true;
    } else {
      return false;
    }
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
