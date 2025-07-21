import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NovedadCursoEstudianteService } from '../../../../services/novedadCursoEstudiante/novedad-curso-estudiante.service';

@Component({
  selector: 'app-crear-actualizar-novedad',
  templateUrl: './crear-actualizar-novedad.component.html',
  styleUrl: './crear-actualizar-novedad.component.css',
})
export class CrearActualizarNovedadComponent {
  constructor(
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private novedadCursoEstudianteService: NovedadCursoEstudianteService // Reemplaza con el servicio real
  ) {}
  messageService = inject(MessageService);
  errorMessage: string = '';
  date: Date | undefined;

  formNovedad: FormGroup = this.formBuilder.group({
    fechaRegistro: [new Date(), Validators.required],
    descripcion: ['', Validators.required],
    
  });

  formSubmitted: boolean = false;

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
              summary: 'Success',
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

  isInvalid(controlName: string) {
    const control = this.formNovedad.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  get fechaRegistro() {
    return this.formNovedad.get('fechaRegistro');
  }

  get descripcion() {
    return this.formNovedad.get('descripcion');
  }
}
