import { Component, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { NovedadCursoEstudianteService } from '../../../../../services/novedadCursoEstudiante/novedad-curso-estudiante.service';
import { Footer } from '../../../../../shared/footer-dialog/footer';
import { CrearActualizarNovedadComponent } from '../../crear-actualizar-novedad/crear-actualizar-novedad.component';

@Component({
  selector: 'app-novedades-curso-estudiante',
  templateUrl: './novedades-curso-estudiante.component.html',
  styleUrl: './novedades-curso-estudiante.component.css',
})
export class NovedadesCursoEstudianteComponent {
  expandedRows = {};
  estudiante: any = null;
  cursoId: number = 0;
  novedadesEstudiante: any[] = []; // Cambia el tipo según tu modelo de datos

  noData: string = '';

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public novedadesCursoEstudianteService: NovedadCursoEstudianteService, // Reemplaza con el servicio real
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.estudiante = this.config.data.estudiante;
    this.cursoId = this.config.data.cursoId;

    this.novedadesCursoEstudianteService
      .getNovedadesByCursoAndEstudianteListDTO(this.cursoId, this.estudiante.id)
      .subscribe({
        next: (novedades) => {
          this.novedadesEstudiante = novedades;
          if (this.novedadesEstudiante.length === 0) {
            this.noData = 'El estudiante no registra ninguna novedad 😊';
          }
          console.log('Novedades del estudiante:', this.novedadesEstudiante);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar las novedades del estudiante.',
          });
          console.error('Error al cargar las novedades:', error);
        },
      });
  }

  cerrar(): void {
    this.ref.close();
  }

  nuevaNovedad(): void {
    this.ref = this.dialogService.open(CrearActualizarNovedadComponent, {
      header: 'Novedades del Estudiante ',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      data: {
        estudiante: this.estudiante,
        curso: this.cursoId,
        
        querido martin del futuro, enviar en data
         el id del estudiante
          y el id del curso,
          y el id del profesor (faltante)
          para que se pueda registrar la novedad correctamente
          
          tqm gossip girl :)

      },
      closable: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      
    });
  }
}
