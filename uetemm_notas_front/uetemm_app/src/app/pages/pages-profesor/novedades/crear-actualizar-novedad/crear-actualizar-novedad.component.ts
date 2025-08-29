import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NovedadCursoEstudianteService } from '../../../../services/novedadCursoEstudiante/novedad-curso-estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-actualizar-novedad',
  templateUrl: './crear-actualizar-novedad.component.html',
  styleUrls: ['./crear-actualizar-novedad.component.css'],
})
export class CrearActualizarNovedadComponent implements OnInit {
  formNovedad: FormGroup;
  formSubmitted: boolean = false;
  errorMessage: string = '';
  date: Date | undefined;
  esActualizar: boolean = false;
  novedad = this.config.data.novedad;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private novedadCursoEstudianteService: NovedadCursoEstudianteService
  ) {
    // Aseguramos valores por defecto seguros
    const novedad = config.data?.novedad || {};
    const estudiante = config.data?.estudiante ?? null;
    const curso = config.data?.curso ?? null;
    const user = config.data?.user ?? null;
    const asignatura = config.data?.asignatura ?? null;

    this.formNovedad = this.formBuilder.group({
      id: [novedad.id ?? ''],
      estudianteId: [estudiante, Validators.required],
      cursoId: [curso, Validators.required],
      profesorId: [user, Validators.required],
      fechaRegistro: [novedad.fechaRegistro ?? new Date(), Validators.required],
      descripcion: [novedad.descripcion ?? '', Validators.required],
      asignaturaId: [asignatura, Validators.required],
    });
    this.esActualizar = false;
  }

  ngOnInit(): void {
    const existeNoveda = this.config.data?.novedad || {};

    if (Object.keys(existeNoveda).length > 0) {
      // El objeto tiene propiedades
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
    const novedadId = this.id?.value;

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
      asignaturaId: this.novedad.asignaturaId,
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

  get id() {
    return this.formNovedad.get('id');
  }

  get fechaRegistro() {
    return this.formNovedad.get('fechaRegistro');
  }

  get descripcion() {
    return this.formNovedad.get('descripcion');
  }

  get asignatura() {
    return this.formNovedad.get('asignaturaId');
  }
}
