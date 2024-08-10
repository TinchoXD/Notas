import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Catalogo } from './catalogo';
import { error } from 'jquery';
import { CatalogoRequest } from './catalogoRequest';
import { AlertType } from '../../shared/alert/alertType';
import { AlertService } from '../alert/alert.service';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(private http: HttpClient, private alertService: AlertService) {

  }

  getEstadoCivilLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/estado_civil').pipe(catchError(this.handleError))
  }
  getSexoLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/sexo').pipe(catchError(this.handleError))
  }
  getRelacionLaboralLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/relacion_laboral').pipe(catchError(this.handleError))
  }
  getJornadaLaboralLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/jornada_laboral').pipe(catchError(this.handleError))
  }
  getCategoriaLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/categoria').pipe(catchError(this.handleError))
  }
  getGrupoEtnicoLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/grupo_etnico').pipe(catchError(this.handleError))
  }
  getNacionanlidadIndigenaLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/nacionalidad_indigena').pipe(catchError(this.handleError))
  }
  getNivelEducacionLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/nivel_educacion').pipe(catchError(this.handleError))
  }
  getActividadLaboralLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/actividad_laboral').pipe(catchError(this.handleError))
  }
  getNivelLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/nivel').pipe(catchError(this.handleError))
  }
  
  
  
  getNivelAsignaturaLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/nivelAsignatura').pipe(catchError(this.handleError))
  }
  
  getSubnivelAsignaturaLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/subNivelAsignatura').pipe(catchError(this.handleError))
  }
  
  getGradoLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/grado').pipe(catchError(this.handleError))
  }
  
  getParaleloLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/paralelo').pipe(catchError(this.handleError))
  }
  
  getAsignaturaLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/asignatura').pipe(catchError(this.handleError))
  }
  
  getAsignaturaActiveLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/asignaturaActive').pipe(catchError(this.handleError))
  }

  putAsignatura(curso: CatalogoRequest) {
    return this.http.post<any>(environment.urlApi + 'catalogos/agregarAsignatura', curso).subscribe({
      next: () => {
        this.showAlert('Asignatura guardada', 'success');
      },
      error: () => {
        this.showAlert('Error al agregar Asignatura', 'error');
        console.log('Error: ', catchError(this.handleError));
      },
    });
  }

  getJornadaLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/jornada').pipe(catchError(this.handleError))
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
