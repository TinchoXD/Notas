import { Component, Inject, OnInit } from '@angular/core';
import { AlertType } from '../../../../shared/alert/alertType';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursoService } from '../../../../services/curso/curso.service';
import { AsignaturaService } from '../../../../services/asignatura/asignatura.service';
import { CursoProfesorService } from '../../../../services/cursoProfesor/curso-profesor.service';
import { CursoProfesorRequest } from '../../../../services/cursoProfesor/cursoProfesorRequest';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-dialogo-curso-profesor',
  templateUrl: './dialogo-curso-profesor.component.html',
  styleUrl: './dialogo-curso-profesor.component.css',
})
export class DialogoCursoProfesorComponent implements OnInit {
  color: ThemePalette = 'primary';
  errorMessage: String = 'Este campo es obligatorio.';

  cursoProfesorForm: FormGroup;

  asignaturas!: any[];
  cursos!: any[];

  cursoProfesor!: any;
  cursoProfesorId!: any;

  seleccionMultiple: any = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogoCursoProfesorComponent>,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private asignaturaService: AsignaturaService,
    private cursoProfesorService: CursoProfesorService,
    private messageServicePNG: MessageService,
  ) {
    this.cursoProfesorForm = this.fb.group({
      id: [''],
      curso_id: ['', Validators.required],
      asignatura_id: ['', Validators.required],
      user_id: [data.user_id, Validators.required],
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

    this.asignaturaService.getAsignaturasActive().subscribe({
      next: (asignaturas) => {
        this.asignaturas = asignaturas;
        this.asignaturas.sort((a, b) => a.nombre.localeCompare(b.nombre));
      },
    });
  }

  ngOnInit(): void {
    this.cursoProfesorId = undefined
    if (this.data.cursoProfesorEdit) {
      console.log('cursoProfesorEdit', this.data.cursoProfesorEdit);

      this.seleccionMultiple = false

      this.cursoProfesorForm.patchValue({
        id: this.data.cursoProfesorEdit.id.toString(),
        curso_id: this.data.cursoProfesorEdit.curso.id,
        asignatura_id: this.data.cursoProfesorEdit.asignatura.id,
        user_id: this.data.cursoProfesorEdit.user.id,
      });
      this.cursoProfesorId = this.data.cursoProfesorEdit.id
    }
  }

  onSubmit() {
    console.log('this.cursoProfesor', this.cursoProfesor)

    
    if (this.cursoProfesorForm.valid) {


      let asignaturas = []
      
      if(this.asignatura?.value.length == undefined){
        console.log('this.asignatura?.value.length', this.asignatura?.value.length);
        console.log('If SI');
        asignaturas = [this.asignatura?.value]
      }else{
        console.log('this.asignatura?.value.length', this.asignatura?.value.length);
        console.log('If NO');
        asignaturas = this.asignatura?.value
      }


      asignaturas.forEach((asigId: number) => {
        console.log(asigId);

        this.cursoProfesorService
          .getCursoProfesorByCursoIdAndAsignaturaId(this.curso?.value, asigId)
          .subscribe({
            next: (res) => {
              this.cursoProfesor = res;
              if (res) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text:
                    '¡El docente ' +
                    this.cursoProfesor.user.firstname +
                    ' ' +
                    this.cursoProfesor.user.lastname +
                    ', ya tiene asignada la asignatura para este curso!',
                  /*  footer: '<a href="#">Why do I have this issue?</a>' */
                });
              } else {

                let cursoProfesor = {
                  id: this.cursoProfesorId,
                  curso_id: this.curso?.value,
                  asignatura_id: asigId,
                  user_id: this.user.value,
                };

                this.cursoProfesorService.putCursoProfesor(cursoProfesor);

                this.messageServicePNG.add({
                  severity: 'success',
                  summary: 'Curso Agregado',
                  detail:
                    'El Curso se ha agregado existosamente',
                });

                /*  this.cursoProfesorService.putCursoProfesor(
                  this.cursoProfesorForm.value as CursoProfesorRequest
               ); */
              }
            },
          });
      });

      this.dialogRef.close(this.cursoProfesorForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get user() {
    return this.cursoProfesorForm.controls['user_id'];
  }

  get asignatura() {
    return this.cursoProfesorForm.controls['asignatura_id'];
  }

  get curso() {
    return this.cursoProfesorForm.controls['curso_id'];
  }
}
