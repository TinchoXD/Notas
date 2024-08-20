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
  subnivelesFiltrados!: Catalogo[]

  grados!: Catalogo[];
  gradosFiltrados!: Catalogo[]

  paralelos!: Catalogo[];

  jornadas!: Catalogo[];
  jornadasFiltrados!: Catalogo[]

  profesores!: User[];

  value: any;
  length: number = 6;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AgregarCursoComponent>,
    private fb: FormBuilder,
    private catalogoService: CatalogoService,
    private alertService: AlertService,
    private cursoService: CursoService,
    private userService: UserService
  ) {
    this.cursoForm = this.fb.group({
      id: [''],
      nivel: ['', Validators.required],
      subnivel: [{ value: '', disabled: true }],
      grado: [{ value: '', disabled: true }],
      paralelo: [{ value: '', disabled: true }],
      jornada: [{ value: '', disabled: true }],
      descripcion: [''],
      codigo: [{ value: '', disabled: true }],

      user_id: ['', Validators.required],
    });
  }

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
        (this.subnivelesAsignatura = subnivelesAsignatura,
          console.log('subnivelesAsignatura', this.subnivelesAsignatura)
        )
      );
    this.catalogoService
      .getGradoLista()
      .subscribe((grados) => (this.grados = grados, console.log('grados', this.grados)));
    this.catalogoService
      .getParaleloLista()
      .subscribe((paralelos) => (this.paralelos = paralelos));
    this.userService
      .getAllUser()
      .subscribe(
        (users) =>
        (this.profesores = users.sort((a, b) =>
          a.firstname.localeCompare(b.firstname)
        ))
      );

    this.catalogoService
      .getJornadaLista()
      .subscribe((jornadas) => (this.jornadas = jornadas));




    //********************** INICIO *************************/
    //********* VALIDACION DE PASOS, CREACION CURSO *********/
    //********************** INICIO *************************/

    const subnivel = this.cursoForm.get('subnivel');
    const grado = this.cursoForm.get('grado');
    const paralelo = this.cursoForm.get('paralelo');
    const jornada = this.cursoForm.get('jornada')

    this.cursoForm.get('nivel')?.valueChanges.subscribe((valueNivel) => {
      if (valueNivel) {
        subnivel?.setValidators([Validators.required]);
        subnivel?.enable();
        if (valueNivel === this.nivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Bachillerato'.toLowerCase())?.id) {
          const idsFiltrados = this.subnivelesAsignatura.filter(item => item.nombre !== undefined && ['Contabilidad', 'Ventas', 'Servicios Hoteleros', 'Mecanizado'].includes(item.nombre)).map(item => item.id); // ESPECIALIDADES DE BACHILLERATO
          this.subnivelesFiltrados = [
            ...this.subnivelesAsignatura.filter(subnivel =>
              subnivel.id !== undefined && idsFiltrados.includes(subnivel.id as number)
            )
          ];
        } else if (valueNivel === this.nivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Educación General Básica'.toLowerCase())?.id) {
          const idsFiltrados = this.subnivelesAsignatura.filter(item => item.nombre !== undefined && ['Elemental', 'Media', 'Superior'].includes(item.nombre)).map(item => item.id); // SUBNIVELES DE EGB
          this.subnivelesFiltrados = [
            ...this.subnivelesAsignatura.filter(subnivel =>
              subnivel.id !== undefined && idsFiltrados.includes(subnivel.id as number)
            )
          ];
        }
      } else {
        subnivel?.clearValidators();
        subnivel?.disable();
        subnivel?.patchValue('');
      }
      subnivel?.updateValueAndValidity();
    });


    this.cursoForm.get('subnivel')?.valueChanges.subscribe((valueSubnivel) => {
      if (valueSubnivel) {
        grado?.setValidators([Validators.required]);
        grado?.enable();
        if (valueSubnivel === this.subnivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Elemental'.toLowerCase())?.id) {
          const idsFiltrados = this.grados.filter(item => item.nombre !== undefined && ['2do', '3ro', '4to'].includes(item.nombre)).map(item => item.id); // GRADOS PARA ELEMENTAL
          this.gradosFiltrados = [
            ...this.grados.filter(grado =>
              grado.id !== undefined && idsFiltrados.includes(grado.id as number)
            )
          ]
        } else if (valueSubnivel === this.subnivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Media'.toLowerCase())?.id) {
          const idsFiltrados = this.grados.filter(item => item.nombre !== undefined && ['5to', '6to', '7mo'].includes(item.nombre)).map(item => item.id); // GRADOS PARA Media
          this.gradosFiltrados = [
            ...this.grados.filter(grado =>
              grado.id !== undefined && idsFiltrados.includes(grado.id as number)
            )
          ]
        } else if (valueSubnivel === this.subnivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Superior'.toLowerCase())?.id) {
          const idsFiltrados = this.grados.filter(item => item.nombre !== undefined && ['8vo', '9no', '10mo'].includes(item.nombre)).map(item => item.id); // GRADOS PARA Superior
          this.gradosFiltrados = [
            ...this.grados.filter(grado =>
              grado.id !== undefined && idsFiltrados.includes(grado.id as number)
            )
          ]
        } else if (valueSubnivel === this.subnivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Contabilidad'.toLowerCase())?.id || valueSubnivel === this.subnivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Ventas'.toLowerCase())?.id || valueSubnivel === this.subnivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Servicios Hoteleros'.toLowerCase())?.id || valueSubnivel === this.subnivelesAsignatura.find(nombre => nombre.nombre?.toLowerCase() === 'Mecanizado'.toLowerCase())?.id) {
          const idsFiltrados = this.grados.filter(item => item.nombre !== undefined && ['1ro', '2do', '3ro'].includes(item.nombre)).map(item => item.id); // GRADOS PARA TODO BACHILLETATO
          this.gradosFiltrados = [
            ...this.grados.filter(grado =>
              grado.id !== undefined && idsFiltrados.includes(grado.id as number)
            )
          ]
        }
      } else {
        grado?.clearValidators();
        grado?.disable();
        grado?.patchValue('');
      }
      grado?.updateValueAndValidity();
    });

    this.cursoForm.get('grado')?.valueChanges.subscribe((valueGrado) => {
      if (valueGrado) {
        paralelo?.setValidators([Validators.required]);
        paralelo?.enable();
      }
    });

    this.cursoForm.get('paralelo')?.valueChanges.subscribe((valueParalelo) => {

      if (valueParalelo) {
        jornada?.setValidators([Validators.required]);
        jornada?.enable();
        if (subnivel?.value === this.subnivelesAsignatura.find(nombre => (nombre.nombre?.toLowerCase() === 'Elemental'.toLowerCase()))?.id || subnivel?.value === this.subnivelesAsignatura.find(nombre => (nombre.nombre?.toLowerCase() === 'Media'.toLowerCase()))?.id) {
          const idsFiltrados = this.jornadas.filter(item => item.nombre !== undefined && ['Matutina'].includes(item.nombre)).map(item => item.id); // JORNADAS PARA Elemental y Media
          this.jornadasFiltrados = [
            ...this.jornadas.filter(subnivel => subnivel.id !== undefined && idsFiltrados.includes(subnivel.id as number))
          ]
        } else if (subnivel?.value === this.subnivelesAsignatura.find(nombre => (nombre.nombre?.toLowerCase() === 'Superior'.toLowerCase()))?.id) {
          const idsFiltrados = this.jornadas.filter(item => item.nombre !== undefined && ['Vespertina'].includes(item.nombre)).map(item => item.id); // JORNADAS PARA Superior
          this.jornadasFiltrados = [
            ...this.jornadas.filter(subnivel => subnivel.id !== undefined && idsFiltrados.includes(subnivel.id as number))
          ]
        } else if (subnivel?.value === this.subnivelesAsignatura.find(nombre => (nombre.nombre?.toLowerCase() === 'Contabilidad'.toLowerCase()))?.id || subnivel?.value === this.subnivelesAsignatura.find(nombre => (nombre.nombre?.toLowerCase() === 'Mecanizado'.toLowerCase()))?.id) {
          const idsFiltrados = this.jornadas.filter(item => item.nombre !== undefined && ['Matutina', 'Nocturna'].includes(item.nombre)).map(item => item.id); // JORNADAS PARA Contabilidad y Mecanizado
          this.jornadasFiltrados = [
            ...this.jornadas.filter(subnivel => subnivel.id !== undefined && idsFiltrados.includes(subnivel.id as number))
          ]
        } else if (subnivel?.value === this.subnivelesAsignatura.find(nombre => (nombre.nombre?.toLowerCase() === 'Ventas'.toLowerCase()))?.id || subnivel?.value === this.subnivelesAsignatura.find(nombre => (nombre.nombre?.toLowerCase() === 'Servicios Hoteleros'.toLowerCase()))?.id) {
          const idsFiltrados = this.jornadas.filter(item => item.nombre !== undefined && ['Matutina'].includes(item.nombre)).map(item => item.id); // JORNADAS PARA Ventas y Servicios Hoteleros
          this.jornadasFiltrados = [
            ...this.jornadas.filter(subnivel => subnivel.id !== undefined && idsFiltrados.includes(subnivel.id as number))
          ]
        }
      }
    });

    //*********************** FIN **************************/
    //********* VALIDACION DE PASOS, CREACION CURSO ********/
    //*********************** FIN **************************/
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
