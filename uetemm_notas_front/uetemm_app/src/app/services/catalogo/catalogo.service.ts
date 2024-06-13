import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Catalogo } from './catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(private http: HttpClient,) {

  }

  getEstadoCivilLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/estado_civil')
  }

  getRelacionLaboralLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/relacion_laboral')
  }
  getJornadaLaboralLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/jornada_laboral')
  }
  getCategoriaLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/categoria')
  }
  getGrupoEtnicoLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/grupo_etnico')
  }
  getGrupoEtnicoOtroLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/grupo_etnico_otro')
  }
  getNivelEducacionLista(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(environment.urlApi + 'catalogos/nivel_educacion')
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
