import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { NovedadCursoEstudianteService } from '../../../../../services/novedadCursoEstudiante/novedad-curso-estudiante.service';
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

  profesorId: number = 0;

  noData: string = '';

  userDataToken!: any;
  userLoggedOn: boolean = false;

  errorMessage: String = '';

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
    this.profesorId = this.config.data.profesor.id;

    this.cargarNovedades();
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
        estudiante: this.estudiante.id,
        curso: this.cursoId,
        user: this.profesorId,
      },
      closable: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    // 👇 Aquí actualizas la tabla si se retorna una novedad
    this.ref.onClose.subscribe((novedadCreada) => {

      //? refrescar toda la tabla desde backend
      if (novedadCreada) {
        this.cargarNovedades(); // Método reutilizable para obtener datos actualizados
      }
    });
  }

    editarNovedad(novedad: any): void {
    this.ref = this.dialogService.open(CrearActualizarNovedadComponent, {
      header: 'Novedades del Estudiante ',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      data: {
        novedad: novedad,
        estudiante: this.estudiante.id,
        curso: this.cursoId,
        user: this.profesorId,
      },
      closable: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    // 👇 Aquí actualizas la tabla si se retorna una novedad
    this.ref.onClose.subscribe((novedadCreada) => {

      //? refrescar toda la tabla desde backend
      if (novedadCreada) {
        this.cargarNovedades(); // Método reutilizable para obtener datos actualizados
      }
    });
  }

  cargarNovedades(): void {
    this.novedadesCursoEstudianteService
      .getNovedadesByCursoAndEstudianteListDTO(this.cursoId, this.estudiante.id)
      .subscribe({
        next: (novedades) => {
          this.novedadesEstudiante = novedades;
          this.noData =
            novedades.length === 0
              ? 'El estudiante no registra ninguna novedad 😊'
              : '';
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar las novedades del estudiante.',
          });
        },
      });
  }
}
