import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursoService } from '../../../../services/curso/curso.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { CursoRequest } from '../../../../services/curso/cursoRequest';
import { Curso } from '../../../../services/curso/curso';

@Component({
  selector: 'app-dialogo-curso-tutor',
  templateUrl: './dialogo-curso-tutor.component.html',
  styleUrl: './dialogo-curso-tutor.component.css',
})
export class DialogoCursoTutorComponent {
  color: ThemePalette = 'primary';
  errorMessage: String = 'Este campo es obligatorio.';

  cursoForm: FormGroup;

  asignaturas!: any[];
  cursos!: any[];

  cursoProfesor!: any;
  cursoProfesorId!: any;

  seleccionMultiple: any = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogoCursoTutorComponent>,
    private fb: FormBuilder,
    private cursoService: CursoService,

    private messageServicePNG: MessageService
  ) {
    this.cursoForm = this.fb.group({
      id: [''],
      curso_id: ['', Validators.required],
      user_id: [''], //[data.user_id, Validators.required],
    });

    this.cursoService.getCursosActivos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.cursos.sort((a, b) => {
          const nivelComparison = a.nivel.nombre.localeCompare(b.nivel.nombre);
          if (nivelComparison !== 0) return nivelComparison;

          const subnivelComparison = a.subnivel.nombre.localeCompare(
            b.subnivel.nombre
          );
          if (subnivelComparison !== 0) return subnivelComparison;

          const gradoComparison = a.grado.nombre.localeCompare(b.grado.nombre);
          if (gradoComparison !== 0) return gradoComparison;

          const paraleloComparison = a.paralelo.nombre.localeCompare(
            b.paralelo.nombre
          );
          if (paraleloComparison !== 0) return paraleloComparison;

          return a.jornada.nombre.localeCompare(b.jornada.nombre);
        });
      },
      error: (err) => {
        console.error('Error fetching cursos:', err);
      },
    });
  }

  ngOnInit(): void {
    this.cursoProfesorId = undefined;
    if (this.data.cursoProfesorEdit) {

      this.seleccionMultiple = false;

      this.cursoForm.patchValue({
        /*  id: this.data.cursoProfesorEdit.id.toString(),
        curso_id: this.data.cursoProfesorEdit.curso.id,
        asignatura_id: this.data.cursoProfesorEdit.asignatura.id,
        user_id: this.data.cursoProfesorEdit.user.id, */
      });

      this.cursoProfesorId = this.data.cursoProfesorEdit.id;
    }
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      this.cursoService.getCursoById(this.curso.value).subscribe({
        next: (curso) => {
          if (curso.user) {
            Swal.fire({
              title: 'El curso seleccionado ya tiene un tutor asignado',
              text: `El tutor actual del curso es: ${curso.user.firstname} ${curso.user.lastname} ¿Desea reemplazarlo?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí!',
            }).then((result) => {
              if (result.isConfirmed) {
                this.cursoForm.patchValue({
                  user_id: this.data.user_id,
                  id: this.curso.value,
                });
                this.cursoService
                  .updateTutorCurso(this.cursoForm.value as CursoRequest)
                  .subscribe();

                this.messageServicePNG.add({
                  severity: 'success',
                  summary: 'Tutor Actualizado',
                  detail: 'El Tutor del Curso ha sido actualizado.',
                });
                this.dialogRef.close(this.cursoForm.value);
              } else {
                this.dialogRef.close(this.cursoForm.value);
                return;
              }
            });
          } else {
            this.cursoForm.patchValue({
              user_id: this.data.user_id,
              id: this.curso.value,
            });
            this.cursoService
              .updateTutorCurso(this.cursoForm.value as CursoRequest)
              .subscribe();

            this.messageServicePNG.add({
              severity: 'success',
              summary: 'Tutor Asignado',
              detail: 'El Tutor del Curso ha sido asignado.',
            });
            this.dialogRef.close(this.cursoForm.value);
          }
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get user() {
    return this.cursoForm.controls['user_id'];
  }

  get curso() {
    return this.cursoForm.controls['curso_id'];
  }
}
