import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NovedadCursoEstudianteService } from '../../../../services/novedadCursoEstudiante/novedad-curso-estudiante.service';
import { CatalogoService } from '../../../../services/catalogo/catalogo.service';

@Component({
  selector: 'app-crear-actualizar-novedad',
  templateUrl: './crear-actualizar-novedad.component.html',
  styleUrls: ['./crear-actualizar-novedad.component.css'],
})
export class CrearActualizarNovedadComponent implements OnInit {
  formNovedad: FormGroup;
  formSubmitted: boolean = false;
  errorMessage: string = '';
  esActualizar: boolean = false;

  asignaturas: any[] = [];

  estudiante: any;
  novedad: any;
  curso: any;
  user: any;
  asignaturaConfig: any;
  ingresaTutor: boolean = false;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private novedadCursoEstudianteService: NovedadCursoEstudianteService,
    private catalogoService: CatalogoService
  ) {
    // Datos iniciales
    this.estudiante = config.data?.estudiante ?? null;
    this.novedad = this.config.data?.novedad;

    if (config.data?.cursoProfesor) {
      this.curso = config.data?.cursoProfesor.curso ?? null;
      this.user = config.data?.cursoProfesor.user ?? null;
      this.asignaturaConfig = config.data?.cursoProfesor.asignatura ?? null;
      this.ingresaTutor = false;
    } else {
      this.asignaturaConfig = config.data?.asignatura ?? null;
      this.curso = config.data?.curso;
      this.user = { id: config.data?.user.userId };
      this.ingresaTutor = true;
    }

    if (!this.novedad) {
      this.novedad = { id: 0 };
    }

    // Definición del formulario
    this.formNovedad = this.formBuilder.group({
      id: [this.novedad.id ?? ''],
      estudianteId: [this.estudiante.id, Validators.required],
      cursoId: [this.curso.id, Validators.required],
      profesorId: [this.user.id, Validators.required],
      fechaRegistro: [
        this.novedad.fechaRegistro ?? new Date(),
        Validators.required,
      ],
      descripcion: [this.novedad.descripcion ?? '', Validators.required],
      asignaturaId: [
        this.asignaturaConfig ? this.asignaturaConfig.id : null,
        this.ingresaTutor ? [Validators.required] : [],
      ],
    });
    this.esActualizar = false;
  }

  ngOnInit(): void {
    this.catalogoService.getAsignaturaActiveLista().subscribe({
      next: (asignaturas) => {
        this.asignaturas = asignaturas;
      },
    });

    const existeNoveda = this.config.data?.novedad || {};
    if (Object.keys(existeNoveda).length > 0) {
      this.esActualizar = true;
    }
  }

  closeDialog(data: any) {
    this.ref.close(data);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.formNovedad.valid) {
      this.novedadCursoEstudianteService
        .registrarNovedadEstudiante(this.formNovedad.value)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Novedad registrada correctamente',
              life: 3000,
            });
            this.formNovedad.reset();
            this.ref.close(response);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo registrar la novedad. Intente nuevamente.',
              life: 3000,
            });
            console.error('Error al registrar la novedad:', error);
          },
        });

      this.formSubmitted = false;
    }
  }

  eliminar() {
    if (!this.novedad) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No hay novedad seleccionada para eliminar',
      });
      return;
    }

    const novedadRequest = {
      id: this.novedad.id,
      fechaRegistro: this.novedad.fechaRegistro,
      descripcion: this.novedad.descripcion,
      cursoId: this.novedad.cursoId,
      estudianteId: this.novedad.estudianteId,
      profesorId: this.novedad.profesorId,
    };

    this.novedadCursoEstudianteService
      .eliminarNovedadEstudiante(novedadRequest)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'La novedad fue eliminada correctamente',
          });
          this.ref.close({ deleted: true });
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la novedad',
          });
          console.error('Error al eliminar novedad:', error);
        },
      });
  }

  isInvalid(controlName: string) {
    const control = this.formNovedad.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  // Getters
  get id() {
    return this.formNovedad.get('id');
  }
  get fechaRegistro() {
    return this.formNovedad.get('fechaRegistro');
  }
  get descripcion() {
    return this.formNovedad.get('descripcion');
  }
  get profesor() {
    return this.formNovedad.get('profesorId');
  }
  get asignatura() {
    return this.formNovedad.get('asignaturaId');
  }
}
