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
  subnivelesFiltrados!: Catalogo[];

  grados!: Catalogo[];
  gradosFiltrados!: Catalogo[];

  paralelos!: Catalogo[];

  jornadas!: Catalogo[];
  jornadasFiltradas!: Catalogo[];

  profesores!: User[];

  editMode: boolean = false;

  //CODIGO inputOtp
  codigoCurso: any;
  length: number = 10;

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
      user_id: ['', Validators.required],
      descripcion: [''],
      codigo: [''],
    });



  }

  ngOnInit(): void {
    if (this.data.cursoEdit) {
      console.log('this.data.cursoEdit', this.data.cursoEdit);
      this.cursoForm.patchValue({
        id: this.data.cursoEdit.id.toString(),
        nivel: this.data.cursoEdit.nivel.id,
        subnivel: this.data.cursoEdit.subnivel.id,
        grado: this.data.cursoEdit.grado.id,
        paralelo: this.data.cursoEdit.paralelo.id,
        jornada: this.data.cursoEdit.jornada.id,
        user_id: this.data.cursoEdit.user.id,
        descripcion: this.data.cursoEdit.descripcion,
        codigo: this.data.cursoEdit.codigo,
      });
    }

    console.log('Nivel : ', this.nivel.value);
    this.subnivelesFiltrados;

    this.catalogoService
      .getNivelAsignaturaLista()
      .subscribe(
        (nivelesAsignatura) => (this.nivelesAsignatura = nivelesAsignatura, console.log('nivelesAsignatura COMPLETO', this.nivelesAsignatura))
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
    const jornada = this.cursoForm.get('jornada');

    let CODIGO_CURSO = '';
    let CODIGO_NIVEL = '';
    let CODIGO_SUBNIVEL = '';
    let CODIGO_GRADO = '';
    let CODIGO_PARALELO = '';
    let CODIGO_JORNADA = '';

    const BACHILLERATO_TECNICO = 'Bachillerato Técnico';
    const EDUCACIÓN_GENERAL_BASICA = 'Educación General Básica';

    const ELEMENTAL = 'Elemental';
    const MEDIA = 'Media';
    const SUPERIOR = 'Superior';

    const CONTABILIDAD = 'Contabilidad';
    const VENTAS_E_INFORMACION_TURISTICA = 'Ventas e Información Turística';
    const SERVICIOS_HOTELEROS = 'Servicios Hoteleros';
    const MECANIZADO_Y_CONSTRUCCIONES_METALICAS =
      'Mecanizado y Construcciones Metálicas';

    const _1RO = '1ro';
    const _2DO = '2do';
    const _3RO = '3ro';
    const _4TO = '4to';
    const _5TO = '5to';
    const _6TO = '6to';
    const _7MO = '7mo';
    const _8VO = '8vo';
    const _9NO = '9no';
    const _10MO = '10mo';

    const PARALELO_A = 'A';
    const PARALELO_B = 'B';
    const PARALELO_C = 'C';
    const PARALELO_D = 'D';
    const PARALELO_E = 'E';
    const PARALELO_F = 'F';
    const PARALELO_G = 'G';
    const PARALELO_H = 'H';
    const PARALELO_I = 'I';

    const MATUTINA = 'Matutina';
    const VESPERTINA = 'Vespertina';
    const NOCTURNA = 'Nocturna';

    if (!this.data.cursoEdit) {

      this.editMode = false;

      this.cursoForm.get('nivel')?.valueChanges.subscribe((valueNivel) => {
        if (valueNivel) {
          subnivel?.setValidators([Validators.required]);
          subnivel?.enable();
          subnivel?.patchValue('');

          grado?.patchValue('');
          jornada?.patchValue('');

          if (
            valueNivel ===
            this.nivelesAsignatura.find(
              (nombre) =>
                nombre.nombre?.toLowerCase() ===
                BACHILLERATO_TECNICO.toLowerCase()
            )?.id
          ) {
            const idsFiltrados = this.subnivelesAsignatura
              .filter(
                (item) =>
                  item.nombre !== undefined &&
                  [
                    CONTABILIDAD,
                    VENTAS_E_INFORMACION_TURISTICA,
                    SERVICIOS_HOTELEROS,
                    MECANIZADO_Y_CONSTRUCCIONES_METALICAS,
                  ].includes(item.nombre)
              )
              .map((item) => item.id); //* ESPECIALIDADES DE Bachillerato Técnico
            this.subnivelesFiltrados = [
              ...this.subnivelesAsignatura.filter(
                (subnivel) =>
                  subnivel.id !== undefined &&
                  idsFiltrados.includes(subnivel.id as number)
              ),
            ];
            CODIGO_NIVEL = 'BAT';
          } else if (
            valueNivel ===
            this.nivelesAsignatura.find(
              (nombre) =>
                nombre.nombre?.toLowerCase() ===
                EDUCACIÓN_GENERAL_BASICA.toLowerCase()
            )?.id
          ) {
            const idsFiltrados = this.subnivelesAsignatura
              .filter(
                (item) =>
                  item.nombre !== undefined &&
                  [ELEMENTAL, MEDIA, SUPERIOR].includes(item.nombre)
              )
              .map((item) => item.id); // SUBNIVELES DE EGB
            this.subnivelesFiltrados = [
              ...this.subnivelesAsignatura.filter(
                (subnivel) =>
                  subnivel.id !== undefined &&
                  idsFiltrados.includes(subnivel.id as number)
              ),
            ];
            CODIGO_NIVEL = 'EGB';
          }

          CODIGO_CURSO =
            CODIGO_NIVEL +
            CODIGO_SUBNIVEL +
            CODIGO_GRADO +
            CODIGO_PARALELO +
            CODIGO_JORNADA;
          this.codigoCurso = CODIGO_CURSO;
          console.log('CODIGO !!!', CODIGO_CURSO);

          this.codigo.patchValue(CODIGO_CURSO);
        } else {
          subnivel?.clearValidators();
          subnivel?.disable();
          subnivel?.patchValue('');

          grado?.clearValidators();
          grado?.disable();
          grado?.patchValue('');
        }
        subnivel?.updateValueAndValidity();
        grado?.updateValueAndValidity();
      });

      this.cursoForm
        .get('subnivel')
        ?.valueChanges.subscribe((valueSubnivel) => {
          if (valueSubnivel) {
            grado?.setValidators([Validators.required]);
            grado?.enable();

            jornada?.patchValue('');

            if (
              valueSubnivel ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === ELEMENTAL.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.grados
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [_2DO, _3RO, _4TO].includes(item.nombre)
                )
                .map((item) => item.id); // GRADOS PARA ELEMENTAL
              this.gradosFiltrados = [
                ...this.grados.filter(
                  (grado) =>
                    grado.id !== undefined &&
                    idsFiltrados.includes(grado.id as number)
                ),
              ];
              CODIGO_SUBNIVEL = 'ELE';
            } else if (
              valueSubnivel ===
              this.subnivelesAsignatura.find(
                (nombre) => nombre.nombre?.toLowerCase() === MEDIA.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.grados
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [_5TO, _6TO, _7MO].includes(item.nombre)
                )
                .map((item) => item.id); // GRADOS PARA MEDIA
              this.gradosFiltrados = [
                ...this.grados.filter(
                  (grado) =>
                    grado.id !== undefined &&
                    idsFiltrados.includes(grado.id as number)
                ),
              ];
              CODIGO_SUBNIVEL = 'MED';
            } else if (
              valueSubnivel ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === SUPERIOR.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.grados
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [_8VO, _9NO, _10MO].includes(item.nombre)
                )
                .map((item) => item.id); // GRADOS PARA SUPERIOR
              this.gradosFiltrados = [
                ...this.grados.filter(
                  (grado) =>
                    grado.id !== undefined &&
                    idsFiltrados.includes(grado.id as number)
                ),
              ];
              CODIGO_SUBNIVEL = 'SUP';
            } else if (
              valueSubnivel ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === CONTABILIDAD.toLowerCase()
              )?.id ||
              valueSubnivel ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() ===
                  VENTAS_E_INFORMACION_TURISTICA.toLowerCase()
              )?.id ||
              valueSubnivel ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() ===
                  SERVICIOS_HOTELEROS.toLowerCase()
              )?.id ||
              valueSubnivel ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() ===
                  MECANIZADO_Y_CONSTRUCCIONES_METALICAS.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.grados
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [_1RO, _2DO, _3RO].includes(item.nombre)
                )
                .map((item) => item.id); // GRADOS PARA TODO BACHILLETATO
              this.gradosFiltrados = [
                ...this.grados.filter(
                  (grado) =>
                    grado.id !== undefined &&
                    idsFiltrados.includes(grado.id as number)
                ),
              ];

              if (
                valueSubnivel ===
                this.subnivelesAsignatura.find(
                  (nombre) =>
                    nombre.nombre?.toLowerCase() === CONTABILIDAD.toLowerCase()
                )?.id
              ) {
                CODIGO_SUBNIVEL = 'CON';
              } else if (
                valueSubnivel ===
                this.subnivelesAsignatura.find(
                  (nombre) =>
                    nombre.nombre?.toLowerCase() ===
                    VENTAS_E_INFORMACION_TURISTICA.toLowerCase()
                )?.id
              ) {
                CODIGO_SUBNIVEL = 'VIT';
              } else if (
                valueSubnivel ===
                this.subnivelesAsignatura.find(
                  (nombre) =>
                    nombre.nombre?.toLowerCase() ===
                    SERVICIOS_HOTELEROS.toLowerCase()
                )?.id
              ) {
                CODIGO_SUBNIVEL = 'SEH';
              } else if (
                valueSubnivel ===
                this.subnivelesAsignatura.find(
                  (nombre) =>
                    nombre.nombre?.toLowerCase() ===
                    MECANIZADO_Y_CONSTRUCCIONES_METALICAS.toLowerCase()
                )?.id
              ) {
                CODIGO_SUBNIVEL = 'MCM';
              }
            }
            CODIGO_CURSO =
              CODIGO_NIVEL +
              CODIGO_SUBNIVEL +
              CODIGO_GRADO +
              CODIGO_PARALELO +
              CODIGO_JORNADA;
            this.codigoCurso = CODIGO_CURSO;
            console.log('CODIGO !!!', CODIGO_CURSO);

            this.codigo.patchValue(CODIGO_CURSO);
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

          if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _1RO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '01';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _2DO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '02';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _3RO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '03';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _4TO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '04';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _5TO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '05';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _6TO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '06';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _7MO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '07';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _8VO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '08';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _9NO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '09';
          } else if (
            valueGrado ===
            this.grados.find(
              (nombre) => nombre.nombre?.toLowerCase() === _10MO.toLowerCase()
            )?.id
          ) {
            CODIGO_GRADO = '10';
          }
          CODIGO_CURSO =
            CODIGO_NIVEL +
            CODIGO_SUBNIVEL +
            CODIGO_GRADO +
            CODIGO_PARALELO +
            CODIGO_JORNADA;
          this.codigoCurso = CODIGO_CURSO;
          console.log('CODIGO !!!', CODIGO_CURSO);

          this.codigo.patchValue(CODIGO_CURSO);
        }
      });

      this.cursoForm
        .get('paralelo')
        ?.valueChanges.subscribe((valueParalelo) => {
          if (valueParalelo) {
            jornada?.setValidators([Validators.required]);
            jornada?.enable();
            if (
              subnivel?.value ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === ELEMENTAL.toLowerCase()
              )?.id ||
              subnivel?.value ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === MEDIA.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.jornadas
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [MATUTINA].includes(item.nombre)
                )
                .map((item) => item.id); // JORNADAS PARA ELEMENTAL y MEDIA
              this.jornadasFiltradas = [
                ...this.jornadas.filter(
                  (subnivel) =>
                    subnivel.id !== undefined &&
                    idsFiltrados.includes(subnivel.id as number)
                ),
              ];
            } else if (
              subnivel?.value ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === SUPERIOR.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.jornadas
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [VESPERTINA].includes(item.nombre)
                )
                .map((item) => item.id); // JORNADAS PARA SUPERIOR
              this.jornadasFiltradas = [
                ...this.jornadas.filter(
                  (subnivel) =>
                    subnivel.id !== undefined &&
                    idsFiltrados.includes(subnivel.id as number)
                ),
              ];
            } else if (
              subnivel?.value ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === CONTABILIDAD.toLowerCase()
              )?.id ||
              subnivel?.value ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() ===
                  MECANIZADO_Y_CONSTRUCCIONES_METALICAS.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.jornadas
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [MATUTINA, NOCTURNA].includes(item.nombre)
                )
                .map((item) => item.id); // JORNADAS PARA Contabilidad y Mecanizado y Construcciones Metálicas
              this.jornadasFiltradas = [
                ...this.jornadas.filter(
                  (subnivel) =>
                    subnivel.id !== undefined &&
                    idsFiltrados.includes(subnivel.id as number)
                ),
              ];
            } else if (
              subnivel?.value ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() ===
                  VENTAS_E_INFORMACION_TURISTICA.toLowerCase()
              )?.id ||
              subnivel?.value ===
              this.subnivelesAsignatura.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() ===
                  SERVICIOS_HOTELEROS.toLowerCase()
              )?.id
            ) {
              const idsFiltrados = this.jornadas
                .filter(
                  (item) =>
                    item.nombre !== undefined &&
                    [MATUTINA].includes(item.nombre)
                )
                .map((item) => item.id); // JORNADAS PARA Ventas y Servicios Hoteleros
              this.jornadasFiltradas = [
                ...this.jornadas.filter(
                  (subnivel) =>
                    subnivel.id !== undefined &&
                    idsFiltrados.includes(subnivel.id as number)
                ),
              ];
            }

            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_A.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_A;
            } else if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_B.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_B;
            }
            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_C.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_C;
            }
            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_D.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_D;
            }
            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_E.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_E;
            }
            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_F.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_F;
            }
            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_G.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_G;
            }
            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_H.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_H;
            }
            if (
              valueParalelo ===
              this.paralelos.find(
                (nombre) =>
                  nombre.nombre?.toLowerCase() === PARALELO_I.toLowerCase()
              )?.id
            ) {
              CODIGO_PARALELO = PARALELO_I;
            }
            CODIGO_CURSO =
              CODIGO_NIVEL +
              CODIGO_SUBNIVEL +
              CODIGO_GRADO +
              CODIGO_PARALELO +
              CODIGO_JORNADA;
            this.codigoCurso = CODIGO_CURSO;
            console.log('CODIGO !!!', CODIGO_CURSO);

            this.codigo.patchValue(CODIGO_CURSO);
          }
        });

      this.cursoForm.get('jornada')?.valueChanges.subscribe((valueJornada) => {
        if (valueJornada) {
          if (
            valueJornada ===
            this.jornadas.find(
              (nombre) =>
                nombre.nombre?.toLowerCase() === MATUTINA.toLowerCase()
            )?.id
          ) {
            CODIGO_JORNADA = 'M';
          } else if (
            valueJornada ===
            this.jornadas.find(
              (nombre) =>
                nombre.nombre?.toLowerCase() === VESPERTINA.toLowerCase()
            )?.id
          ) {
            CODIGO_JORNADA = 'V';
          } else if (
            valueJornada ===
            this.jornadas.find(
              (nombre) =>
                nombre.nombre?.toLowerCase() === NOCTURNA.toLowerCase()
            )?.id
          ) {
            CODIGO_JORNADA = 'N';
          }

          CODIGO_CURSO =
            CODIGO_NIVEL +
            CODIGO_SUBNIVEL +
            CODIGO_GRADO +
            CODIGO_PARALELO +
            CODIGO_JORNADA;
          this.codigoCurso = CODIGO_CURSO;
          console.log('CODIGO !!!', CODIGO_CURSO);

          this.codigo.patchValue(CODIGO_CURSO);
        }
      });
    }
    else {
      this.editMode = true;
    }

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
  get codigo() {
    return this.cursoForm.controls['codigo'];
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.editMode) {
      crear servicio para Actualizar curso
    } else {



      if (this.cursoForm.valid) {
        this.data.cursoEdit;
        this.cursoService.getCursoByCodigo(this.codigo.value).subscribe({
          next: (resp) => {
            if (resp) {
              if (this.data.cursoEdit) {
                this.cursoService.putCurso(this.cursoForm.value as CursoRequest);
                this.dialogRef.close(this.cursoForm.value);
              } else {
                this.showAlert('El curso ya existe', 'error');
              }
            } else {
              this.cursoService.putCurso(this.cursoForm.value as CursoRequest);
              this.dialogRef.close(this.cursoForm.value);
            }
          },
        });
      } else {
        this.showAlert(
          'Error al agregar un nuevo curso, valide los datos del formulario',
          'error'
        );
      }
    }

  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)) {
      this.alertService.showAlert(mensaje, type);
    }
  }
}
