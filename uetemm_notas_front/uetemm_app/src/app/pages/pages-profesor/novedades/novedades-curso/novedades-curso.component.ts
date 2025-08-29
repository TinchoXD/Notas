import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CalificacionService } from '../../../../services/calificacion/calificacion.service';
import { ConfiguracionFechasService } from '../../../../services/configuracionFechas/configuracion-fechas.service';
import { CursoService } from '../../../../services/curso/curso.service';
import { CursoProfesorService } from '../../../../services/cursoProfesor/curso-profesor.service';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { NotaService } from '../../../../services/nota/nota.service';
import { UserService } from '../../../../services/user/user.service';
import { CursoServiceShared } from '../../../../shared/cursoShared.service';
import { async, forkJoin } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NovedadesCursoEstudianteComponent } from './novedades-curso-estudiante/novedades-curso-estudiante.component';
import { Footer } from '../../../../shared/footer-dialog/footer';

@Component({
  selector: 'app-novedades-curso',
  templateUrl: './novedades-curso.component.html',
  styleUrl: './novedades-curso.component.css',
})
export class NovedadesCursoComponent implements OnInit {
  loading: boolean = true;

  cursoId: number = 0;
  curso: any;
  id: number = 0;
  codigo: string | null = null;
  estudiantes: any[] = [];
  cursoProfesor: any;
  nombreCurso: string = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursoProfesorService: CursoProfesorService,
    private estudianteService: EstudianteService,
    private notaService: NotaService,
    private messageServicePNG: MessageService,
    private calificacionService: CalificacionService,
    private cursoService: CursoService,
    private cursoServiceShared: CursoServiceShared,
    private configuracionFechasService: ConfiguracionFechasService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Imprimir la URL actual
    this.cursoId = this.cursoService.getCursoId();

    this.cargarDatosCurso();

    console.log('Curso: ', this.curso);

    forkJoin({
      estudiantes: this.estudianteService.getEstudiantesByCursoId(this.cursoId),
      cursoProfesor: this.cursoProfesorService.getCursoProfesorByCursoId(
        this.cursoId
      ),
    }).subscribe({
      next: ({ estudiantes, cursoProfesor }) => {
        this.estudiantes = estudiantes;
        this.cursoProfesor = cursoProfesor[0];

        console.log('this.cursoProfesor = cursoProfesor;', this.cursoProfesor);
      },
      error: (err) => {
        console.error('Error al cargar los estudiantes:', err);
        this.messageServicePNG.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los estudiantes del curso',
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  cargarDatosCurso(): void {
    this.cursoService.getCursoById(this.cursoId).subscribe({
      next: (curso) => {
        console.log('Datos del curso:', curso);
        this.curso = curso;
        this.nombreCurso =
          this.curso.nivel.nombre +
          ' ' +
          this.curso.subnivel.nombre +
          ' ' +
          this.curso.grado.nombre +
          ' ' +
          this.curso.paralelo.nombre +
          ' ' +
          this.curso.subnivel.nombre +
          ' - ' +
          this.curso.jornada.nombre;
        // Aquí puedes manejar los datos del curso
      },
      error: (error) => {
        console.error('Error al cargar el curso:', error);
        this.messageServicePNG.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del curso',
        });
      },
    });
  }

  seleccionarEstudiante(estudiante: any): void {
    console.log('Estudiante seleccionado:', estudiante);
    this.ref = this.dialogService.open(NovedadesCursoEstudianteComponent, {
      header: 'Novedades del Estudiante ' + estudiante.apellidosNombres,
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      data: {
        cursoId: this.cursoId,
        estudiante,
        profesor: this.cursoProfesor.user,
        asignatura: this.cursoProfesor.asignatura,
      },
      closable: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      templates: {
        footer: Footer,
      },
    });
  }

  regresar() {
    this.router.navigate(['/novedades'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
