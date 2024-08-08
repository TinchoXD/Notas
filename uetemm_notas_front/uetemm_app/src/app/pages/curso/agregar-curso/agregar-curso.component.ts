import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Catalogo } from '../../../services/catalogo/catalogo';
import { CatalogoService } from '../../../services/catalogo/catalogo.service';
import { AlertType } from '../../../shared/alert/alertType';
import { AlertService } from '../../../services/alert/alert.service';
import { CursoService } from '../../../services/curso/curso.service';
import { CursoRequest } from '../../../services/curso/cursoRequest';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.css',
})
export class AgregarCursoComponent implements OnInit {
  color: ThemePalette = 'primary';

  cursoForm: FormGroup;
  errorMessage: String = 'Este campo es obligatorio.';

  userId: number = 0;

  nivelesAsignatura!: Catalogo[];
  subnivelesAsignatura!: Catalogo[];
  grados!: Catalogo[];
  paralelos!: Catalogo[];
  asignaturas!: Catalogo[];
  jornadas!: Catalogo[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AgregarCursoComponent>,
    private fb: FormBuilder,
    private catalogoService: CatalogoService,
    private alertService: AlertService,
    private cursoService: CursoService
  ) {
    this.cursoForm = this.fb.group({
      id: [''],
      nivel: ['', Validators.required],
      subnivel: ['', Validators.required],
      grado: ['', Validators.required],
      paralelo: ['', Validators.required],
      asignatura: ['', Validators.required],
      jornada: ['', Validators.required],
      descripcion: [''],
      user_id: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.data.cursoEdit) {
      console.log(this.data.cursoEdit);
      this.cursoForm.patchValue({
        id: this.data.cursoEdit.id,
        nivel: this.data.cursoEdit.nivel,
        subnivel: this.data.cursoEdit.subnivel,
        grado: this.data.cursoEdit.grado,
        paralelo: this.data.cursoEdit.paralelo,
        asignatura: this.data.cursoEdit.asignatura,
        jornada: this.data.cursoEdit.jornada,
        descripcion: this.data.cursoEdit.descripcion,
        user_id: this.data.userId,
      });
    } else {
      this.cursoForm.patchValue({
        user_id: this.data.userId,
      });
    }

    this.catalogoService
      .getNivelAsignaturaLista()
      .subscribe(
        (nivelesAsignatura) => (this.nivelesAsignatura = nivelesAsignatura)
      );
    this.catalogoService
      .getSubnivelAsignaturaLista()
      .subscribe(
        (subnivelesAsignatura) =>
          (this.subnivelesAsignatura = subnivelesAsignatura)
      );
    this.catalogoService
      .getGradoLista()
      .subscribe((grados) => (this.grados = grados));
    this.catalogoService
      .getParaleloLista()
      .subscribe((paralelos) => (this.paralelos = paralelos));
    this.catalogoService
      .getAsignaturaLista()
      .subscribe((asignaturas) => (this.asignaturas = asignaturas));
    this.catalogoService
      .getJornadaLista()
      .subscribe((jornadas) => (this.jornadas = jornadas));

    this.userId = this.data.userId;
  }

  get nivel() {
    return this.cursoForm.controls['nivel'];
  }
  get subnivel() {
    return this.cursoForm.controls['subnivel'];
  }
  get grado() {
    return this.cursoForm.controls['grado'];
  }
  get paralelo() {
    return this.cursoForm.controls['paralelo'];
  }
  get asignatura() {
    return this.cursoForm.controls['asignatura'];
  }
  get jornada() {
    return this.cursoForm.controls['jornada'];
  }
  get descripcion() {
    return this.cursoForm.controls['descripcion'];
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      console.log('this.cursoForm.value', this.cursoForm.value);
      this.cursoService.putCurso(this.cursoForm.value as CursoRequest);
      this.dialogRef.close(this.cursoForm.value);
    } else {
      this.showAlert(
        'Error al agregar un nuevo curso, valide los datos del formulario',
        'error'
      );
    }
  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)) {
      this.alertService.showAlert(mensaje, type);
    }
  }
}
