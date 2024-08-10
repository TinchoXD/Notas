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
import { User } from '../../../services/auth/user';
import { UserService } from '../../../services/user/user.service';

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

  nivelesAsignatura: Catalogo[] = [];
  subnivelesAsignatura!: Catalogo[];
  grados!: Catalogo[];
  paralelos!: Catalogo[];
  jornadas!: Catalogo[];
  profesores!: User[];
  
  ngOnInit(): void {
    if (this.data.cursoEdit) {
      console.log(this.data.cursoEdit);
      this.cursoForm.patchValue({
        id: this.data.cursoEdit.id.toString(),
        nivel: this.data.cursoEdit.nivel.id,
        subnivel: this.data.cursoEdit.subnivel.id,
        grado: this.data.cursoEdit.grado.id,
        paralelo: this.data.cursoEdit.paralelo.id,
        jornada: this.data.cursoEdit.jornada.id,
        user_id: this.data.cursoEdit.user.id,
        descripcion: this.data.cursoEdit.descripcion,
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
    this.userService
      .getAllUser()
      .subscribe((users) => (
        this.profesores = users.sort((a, b) => a.firstname.localeCompare(b.firstname))
      ));

    this.catalogoService
      .getJornadaLista()
      .subscribe((jornadas) => (this.jornadas = jornadas));
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AgregarCursoComponent>,
    private fb: FormBuilder,
    private catalogoService: CatalogoService,
    private alertService: AlertService,
    private cursoService: CursoService,
    private userService: UserService,
  ) {
    this.cursoForm = this.fb.group({
      id: [''],
      nivel: ['', Validators.required],
      subnivel: ['', Validators.required],
      grado: ['', Validators.required],
      paralelo: ['', Validators.required],
      jornada: ['', Validators.required],
      descripcion: [''],
      user_id: ['', Validators.required],
    });
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
    return this.cursoForm.controls['paralelo']
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
  get user() {
    return this.cursoForm.controls['user_id'];
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.cursoForm.valid) {
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
