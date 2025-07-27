import { Component, OnInit } from '@angular/core';
import { NovedadCursoEstudianteService } from '../../../../../services/novedadCursoEstudiante/novedad-curso-estudiante.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-novedes-estudiante',
  templateUrl: './novedes-estudiante.component.html',
  styleUrl: './novedes-estudiante.component.css',
})
export class NovedesEstudianteComponent implements OnInit {
  novedades: any[] = [];
  estuadiante: any;
  profesor: any;
  noData: any;
  constructor(
    private novedadesService: NovedadCursoEstudianteService,
    private profesorService: UserService,
    public config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    this.estuadiante = this.config.data.estudiante;
    this.novedadesService
      .getNovedadesByEstudiante(this.estuadiante.id)
      .subscribe({
        next: (novedades) => {
          this.novedades = novedades;
          console.log('novedades', novedades);


          const novedadesNew = this.novedades.map((n) => ({
            id: n.id,
            curso: n.curso,
            descripcion: n.descripcion, 
            fechaRegistro: n.fechaRegistro,
            estuadiante: n.estudiante,
            profesor: n.profesor.firstname + " " + n.profesor.lastname
          }));

          console.log('novedadesNew', novedadesNew)

          this.noData =
            novedades.length === 0
              ? 'El estudiante no registra ninguna novedad 😊'
              : '';
        },
      });
  }
}
