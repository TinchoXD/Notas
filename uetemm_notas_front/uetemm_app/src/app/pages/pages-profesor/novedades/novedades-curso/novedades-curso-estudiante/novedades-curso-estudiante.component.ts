import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { NovedadCursoEstudianteService } from '../../../../../services/novedadCursoEstudiante/novedad-curso-estudiante.service';
import { CrearActualizarNovedadComponent } from '../../crear-actualizar-novedad/crear-actualizar-novedad.component';
import { CatalogoService } from '../../../../../services/catalogo/catalogo.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-novedades-curso-estudiante',
  templateUrl: './novedades-curso-estudiante.component.html',
  styleUrl: './novedades-curso-estudiante.component.css',
})
export class NovedadesCursoEstudianteComponent {
  expandedRows = {};
  estudiante: any = null;
  curso: any;
  cursoId: number = 0;
  novedadesEstudiante: any[] = []; // Cambia el tipo según tu modelo de datos

  profesorId: number = 0;
  asignatura: any;

  noData: string = '';
  user: any;
  userDataToken!: any;
  userLoggedOn: boolean = false;

  errorMessage: String = '';

  cursoProfesor: any;

  ingresaTutor: boolean = false;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public novedadesCursoEstudianteService: NovedadCursoEstudianteService, // Reemplaza con el servicio real
    private messageService: MessageService,
    private catalogoService: CatalogoService,
    public dialogService: DialogService
  ) {}

  async ngOnInit() {
    this.estudiante = this.config.data.estudiante;

    if (this.config.data.cursoProfesor) {
      //alert('existe cursoProfesor')
      this.cursoId = this.config.data.cursoProfesor.curso.id;
      this.profesorId = this.config.data.cursoProfesor.user.id;
      this.asignatura = this.config.data.cursoProfesor.asignatura;
      this.cursoProfesor = this.config.data.cursoProfesor;
      this.ingresaTutor = false;
    } else {
      //alert('NO existe cursoProfesor')
      this.cursoId = this.config.data.curso.id;
      this.profesorId = this.config.data.curso.user.id;
      this.curso = this.config.data.curso;
      this.user = this.config.data.tutor;
      this.catalogoService.getCatalogo(114).subscribe({
        next: (asignatura) => {
          this.asignatura = asignatura;
        },
      });
      this.ingresaTutor = true;
    }

    this.cargarNovedades();
  }

  cerrar(): void {
    this.ref.close();
  }

  nuevaNovedad(): void {
    let data;
    if (this.ingresaTutor) {
      data = {
        estudiante: this.estudiante,
        curso: this.curso,
        user: this.user,
        asignatura: this.asignatura,
      };
    } else {
      data = {
        estudiante: this.estudiante,
        cursoProfesor: this.cursoProfesor,
      };
    }

    this.ref = this.dialogService.open(CrearActualizarNovedadComponent, {
      header: 'Novedades del Estudiante ',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      data: data,
      closable: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      focusOnShow: false, // 👈 evita que intente forzar el focus
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
        estudiante: this.estudiante,
        cursoProfesor: this.cursoProfesor,
      },
      closable: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      focusOnShow: false, // 👈 evita que intente forzar el focus
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
          if (novedades.length === 0) {
            this.novedadesEstudiante = [];
            this.noData = 'El estudiante no registra ninguna novedad 😊';
            return;
          }

          // Para cada novedad, pedir su asignatura
          const requests = novedades.map((item: any) =>
            this.catalogoService
              .getCatalogo(item.asignaturaId) // ✅ corregido
              .pipe(map((asignatura) => ({ ...item, asignatura })))
          );

          forkJoin(requests).subscribe({
            next: (resultados) => {
              this.novedadesEstudiante = resultados as any[];
              this.noData = '';
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar las asignaturas.',
              });
            },
          });
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
