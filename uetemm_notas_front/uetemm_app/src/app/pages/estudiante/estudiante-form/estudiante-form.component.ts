import { Component, OnInit, signal } from '@angular/core';
import { AlertType } from '../../../shared/alert/alertType';
import { ThemePalette } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from '../../../services/catalogo/catalogo.service';
import { Catalogo } from '../../../services/catalogo/catalogo';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { CursosComponent } from '../../curso/curso/cursos.component';
import { MatDialog } from '@angular/material/dialog';
import { AsignarCursoComponent } from '../asignar-curso/asignar-curso.component';
import { MessageService } from 'primeng/api';
import { __values } from 'tslib';
import { LoadingService } from '../../../services/loading/loading.service';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

interface ServicioBasico {
  value: string,
  nombre: string
}

@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.css',
})
export class EstudianteFormComponent implements OnInit {
  color: ThemePalette = 'primary';
  colorInfo: ThemePalette = 'accent';

  asignarCursoDialog: boolean = false;
  submitted: boolean = false;
  cursoSeleccionado: any;

  catalogoGrupoEtnico: Catalogo[] = [];
  catalogoSexo: Catalogo[] = [];
  catalogoEstadoCivil: Catalogo[] = [];
  catalogoNivelInstruccion: Catalogo[] = [];

  representanteMadre: number = 1;
  representantePadre: number = 1;
  representanteAdicional: number = 0;

  /* serviciosBasicos: string[] = ['Luz Eléctrica', 'Agua Potable', 'Teléfono', 'Cable', 'Celular', 'Internet']; */

  serviciosBasicos: ServicioBasico[] = [
    { value: 'luz_electrica', nombre: 'Luz Eléctrica' },
    { value: 'agua_potable', nombre: 'Agua Potable' },
    { value: 'telefono', nombre: 'Teléfono' },
    { value: 'cable', nombre: 'Cable' },
    { value: 'celular', nombre: 'Celular' },
    { value: 'internet', nombre: 'Internet' },

  ];

  serviciosBasicosSeleccionados!: string[]

  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  estudianteForm: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    lugarNacimiento: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    cedula: ['', Validators.required],
    curso_id: [''],
    curso: ['', Validators.required],
    grupoEtnico: ['', Validators.required],
    sexo: ['', Validators.required],
    direccionDomicilio: ['', Validators.required],
    telefonoDomicilio: ['', []],
    telefonoCelularMadre: ['', [Validators.pattern(/^[0-9]+$/)]],
    telefonoCelularPadre: ['', [Validators.pattern(/^[0-9]+$/)]],
  });

  madreForm: FormGroup = this.formBuilder.group({
    nombresMadre: ['', Validators.required],
    apellidosMadre: ['', Validators.required],
    cedulaMadre: ['', Validators.required],
    fechaNacimientoMadre: ['', Validators.required],
    estadoCivilMadre: ['', Validators.required],
    nivelInstruccionMadre: ['', Validators.required],
    ocupacionMadre: ['', Validators.required],
    correoElectronicoMadre: ['', Validators.email],
    direccionDomicilioMadre: ['', Validators.required],
    telefonoDomicilioMadre: ['', []],
    lugarTrabajoMadre: ['', []],
    telefonoTrabajoMadre: ['', []],
  });

  padreForm: FormGroup = this.formBuilder.group({
    nombresPadre: ['', Validators.required],
    apellidosPadre: ['', Validators.required],
    cedulaPadre: ['', Validators.required],
    fechaNacimientoPadre: ['', Validators.required],
    estadoCivilPadre: ['', Validators.required],
    nivelInstruccionPadre: ['', Validators.required],
    ocupacionPadre: ['', Validators.required],
    correoElectronicoPadre: ['', Validators.email],
    direccionDomicilioPadre: ['', Validators.required],
    telefonoDomicilioPadre: ['', []],
    lugarTrabajoPadre: ['', []],
    telefonoTrabajoPadre: ['', []],
  });

  representanteForm: FormGroup = this.formBuilder.group({
    nombresRepresentante: ['', Validators.required],
    apellidosRepresentante: ['', Validators.required],
    cedulaRepresentante: ['', Validators.required],
    estadoCivilRepresentante: ['', Validators.required],
    nivelInstruccionRepresentante: ['', Validators.required],
    ocupacionRepresentante: ['', Validators.required],
    correoElectronicoRepresentante: ['', Validators.email],
    direccionDomicilioRepresentante: ['', Validators.required],
    parentescoRepresentante: ['', Validators.required],
    telefonoDomicilioRepresentante: ['', []],
    lugarTrabajoRepresentante: ['', []],
    telefonoTrabajoRepresentante: ['', []],
    telefonoCelularRepresentante: ['',],
  });





  datosFamiliaresForm: FormGroup = this.formBuilder.group({
    familiaUnionPadres: ['', Validators.required],
    familiaUnionPadresOtro: [{ value: '', disabled: true }],
    familiaNumeroHijos: ['',],
    familiaNumeroHijosVarones: ['',],
    familiaNumeroHijosMujeres: ['',],
    familiaNumeroPuestoEntreHermanos: ['', Validators.required],
    familiaDetallePersonsasVivenConEstudiante: ['', Validators.required],
    familiaNumeroFamiliaresDiscapacidad: ['', Validators.required],
    familiaFamiliaresDiscacidadDescripcion: [{ value: '', disabled: true }],
    familiaTipoVivienda: ['', Validators.required],
    familiaTipoViviendaOtro: [{ value: '', disabled: true }],
    familiaServiciosBasicos: ['', Validators.required],
  })

  datosFamiliaresFormAux: FormGroup = this.formBuilder.group({
    familiaUnionPadres: [''],
    familiaUnionPadresOtro: [''],
    familiaNumeroHijos: [''],
    familiaNumeroHijosVarones: [''],
    familiaNumeroHijosMujeres: [''],
    familiaNumeroPuestoEntreHermanos: [''],
    familiaDetallePersonsasVivenConEstudiante: [''],
    familiaNumeroFamiliaresDiscapacidad: [''],
    familiaFamiliaresDiscacidadDescripcion: [''],
    familiaTipoVivienda: [''],
    familiaTipoViviendaOtro: [''],
    familiaServiciosBasicos: [''],
  })

  antecedentesMadreForm: FormGroup = this.formBuilder.group({
    antecedentesMadreDificultadEmbarazo: [''],
    antecedentesMadreDificultadEmbarazoDescripcion: [{ value: '', disabled: true }],
    antecedentesMadreDificultadParto: [''],
    antecedentesMadreDificultadPartoDescripcion: [{ value: '', disabled: true }],
  })

  antecedentesEstudianteForm: FormGroup = this.formBuilder.group({
    antecedentesEstudianteDatosNinez: [''],
    antecedentesEstudianteHistoriaEscolar: [''],
    antecedentesEstudianteNecesidadEducativaEspecial: [''],
    antecedentesEstudianteNumeroCarne: [{ value: '', disabled: true }],
    antecedentesEstudiantePorcentajeDiscapacidad: [{ value: '', disabled: true }],
    antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion: [{ value: '', disabled: true }],
    antecedentesEstudianteDatosRelevantes: [''],
    antecedentesEstudianteTomaMedicamento: [''],
    antecedentesEstudianteMedicamentoDescripcion: [{ value: '', disabled: true }],
    antecedentesEstudianteMedicamentoRazon: [{ value: '', disabled: true }],
    antecedentesEstudianteRepiteAnios: [''],
    antecedentesEstudianteAniosRepetidos: [{ value: '', disabled: true }],
    antecedentesEstudianteSeguimiento: [''],

  })

  seguimientoForm: FormGroup = this.formBuilder.group({
    seguimiento: ['']
  })

  errorMessage: String = 'Este campo es obligatorio.';

  get errorMessageTelefonoMadre(): string {
    if (this.telefonoCelularMadre.hasError('required')) {
      return 'El número de teléfono es obligatorio';
    } else if (this.telefonoCelularMadre.hasError('pattern')) {
      return 'Solo se permiten números';
    }
    return '';
  }

  get errorMessageTelefonoPadre(): string {
    if (this.telefonoCelularPadre.hasError('required')) {
      return 'El número de teléfono es obligatorio';
    } else if (this.telefonoCelularPadre.hasError('pattern')) {
      return 'Solo se permiten números';
    }
    return '';
  }

  estudiante_id: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogoService,
    private estudianteService: EstudianteService,
    public dialog: MatDialog,
    private messageServicePNG: MessageService,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.estudiante_id = +params['id']; // El signo '+' convierte el string a número
    });

    this.estudianteService.getEstudianteById(this.estudiante_id).subscribe({
      next: (estudiante) => {

        this.estudianteForm.patchValue({
          id: estudiante.id.toString(),
          nombres: estudiante.nombres,
          apellidos: estudiante.apellidos,
          lugarNacimiento: estudiante.lugarNacimiento,
          fechaNacimiento: estudiante.fechaNacimiento,
          cedula: estudiante.cedula,
          curso_id: estudiante.curso ? estudiante.curso.id : null,
          curso: estudiante.curso ? estudiante.curso.nivel.nombre + ' - ' + estudiante.curso.subnivel.nombre + ' - ' + estudiante.curso.grado.nombre + ' - ' + estudiante.curso.paralelo.nombre + ' - ' + estudiante.curso.jornada.nombre : null,
          grupoEtnico: estudiante.grupoEtnico ? estudiante.grupoEtnico.id : null,
          sexo: estudiante.sexo ? estudiante.sexo.id : null,
          direccionDomicilio: estudiante.domicilio,
          telefonoDomicilio: estudiante.telefonoDomicilio,
          telefonoCelularMadre: estudiante.telefonoCelularMadre,
          telefonoCelularPadre: estudiante.telefonoCelularPadre,
        });

        this.madreForm.patchValue({
          id: estudiante.id.toString(),
          nombresMadre: estudiante.madreNombres,
          apellidosMadre: estudiante.madreApellidos,
          cedulaMadre: estudiante.madreCedula,
          fechaNacimientoMadre: estudiante.madreFechaNacimiento,
          estadoCivilMadre: estudiante.madreEstadoCivil ? estudiante.madreEstadoCivil.id : null,
          nivelInstruccionMadre: estudiante.madreNivelInstruccion ? estudiante.madreNivelInstruccion.id : null,
          ocupacionMadre: estudiante.madreOcupacion,
          correoElectronicoMadre: estudiante.madreCorreo,
          direccionDomicilioMadre: estudiante.madreDireccionDomicilio,
          telefonoDomicilioMadre: estudiante.madreTelefonoDomicilio,
          lugarTrabajoMadre: estudiante.madreLugarTrabajo,
          telefonoTrabajoMadre: estudiante.madreTelefonoTrabajo,
        })

        this.padreForm.patchValue({
          id: estudiante.id.toString(),
          nombresPadre: estudiante.padreNombres,
          apellidosPadre: estudiante.padreApellidos,
          cedulaPadre: estudiante.padreCedula,
          fechaNacimientoPadre: estudiante.padreFechaNacimiento,
          estadoCivilPadre: estudiante.padreEstadoCivil ? estudiante.padreEstadoCivil.id : null,
          nivelInstruccionPadre: estudiante.padreNivelInstruccion ? estudiante.padreNivelInstruccion.id : null,
          ocupacionPadre: estudiante.padreOcupacion,
          correoElectronicoPadre: estudiante.padreCorreo,
          direccionDomicilioPadre: estudiante.padreDireccionDomicilio,
          telefonoDomicilioPadre: estudiante.padreTelefonoDomicilio,
          lugarTrabajoPadre: estudiante.padreLugarTrabajo,
          telefonoTrabajoPadre: estudiante.padreTelefonoTrabajo,
        })

        this.representanteForm.patchValue({
          id: estudiante.id.toString(),
          nombresRepresentante: estudiante.representanteNombres,
          apellidosRepresentante: estudiante.representanteApellidos,
          cedulaRepresentante: estudiante.representanteCedula,
          parentescoRepresentante: estudiante.representanteParentesco,
          estadoCivilRepresentante: estudiante.representanteEstadoCivil ? estudiante.representanteEstadoCivil.id : null,
          nivelInstruccionRepresentante: estudiante.representanteNivelInstruccion ? estudiante.representanteNivelInstruccion.id : null,
          ocupacionRepresentante: estudiante.representanteOcupacion,
          correoElectronicoRepresentante: estudiante.representanteCorreo,
          direccionDomicilioRepresentante: estudiante.representanteDireccionDomicilio,
          telefonoDomicilioRepresentante: estudiante.representanteTelefonoDomicilio,
          lugarTrabajoRepresentante: estudiante.representanteLugarTrabajo,
          telefonoTrabajoRepresentante: estudiante.representanteTelefonoTrabajo,
        })

        if (Object.values(this.madreForm.value).every(value => value === null)) {
          this.representanteMadre = 1
        } else {
          this.representanteMadre = 0
        }
        if (Object.values(this.padreForm.value).every(value => value === null)) {
          this.representantePadre = 1
        } else {
          this.representantePadre = 0
        }

        this.serviciosBasicosSeleccionados = estudiante.familiaServiciosBasicos ? estudiante.familiaServiciosBasicos.split(',').map((item: string) => item.trim()) : '';
        this.datosFamiliaresForm.patchValue({
          id: estudiante.id.toString(),
          familiaUnionPadres: estudiante.familiaUnionPadres,
          familiaUnionPadresOtro: estudiante.familiaUnionPadresOtro,
          familiaNumeroHijos: estudiante.familiaNumeroHijos,
          familiaNumeroHijosVarones: estudiante.familiaNumeroHijosVarones,
          familiaNumeroHijosMujeres: estudiante.familiaNumeroHijosMujeres,
          familiaNumeroPuestoEntreHermanos: estudiante.familiaNumeroPuestoEntreHermanos ? estudiante.familiaNumeroPuestoEntreHermanos.toString() : null,
          familiaDetallePersonsasVivenConEstudiante: estudiante.familiaDetallePersonsasVivenConEstudiante,
          familiaNumeroFamiliaresDiscapacidad: estudiante.familiaNumeroFamiliaresDiscapacidad ? estudiante.familiaNumeroFamiliaresDiscapacidad.toString() : null,
          familiaFamiliaresDiscacidadDescripcion: estudiante.familiaFamiliaresDiscacidadDescripcion,
          familiaTipoVivienda: estudiante.familiaTipoVivienda,
          familiaTipoViviendaOtro: estudiante.familiaTipoViviendaOtro,
          familiaServiciosBasicos: this.serviciosBasicosSeleccionados,
          /* familiaServiciosBasicos: estudiante.familiaServiciosBasicos, */
        })

        this.antecedentesMadreForm.patchValue({
          id: estudiante.id.toString(),
          antecedentesMadreDificultadEmbarazo: estudiante.antecedentesMadreDificultadEmbarazo ? estudiante.antecedentesMadreDificultadEmbarazo.toString() : null,
          antecedentesMadreDificultadEmbarazoDescripcion: estudiante.antecedentesMadreDificultadEmbarazoDescripcion,
          antecedentesMadreDificultadParto: estudiante.antecedentesMadreDificultadParto ? estudiante.antecedentesMadreDificultadParto.toString() : null,
          antecedentesMadreDificultadPartoDescripcion: estudiante.antecedentesMadreDificultadPartoDescripcion,
        })

        this.antecedentesEstudianteForm.patchValue({
          id: estudiante.id.toString(),
          antecedentesEstudianteDatosNinez: estudiante.antecedentesEstudianteDatosNinez,
          antecedentesEstudianteHistoriaEscolar: estudiante.antecedentesEstudianteHistoriaEscolar,
          antecedentesEstudianteNecesidadEducativaEspecial: estudiante.antecedentesEstudianteNecesidadEducativaEspecial,
          antecedentesEstudianteNumeroCarne: estudiante.antecedentesEstudianteNumeroCarne,
          antecedentesEstudiantePorcentajeDiscapacidad: estudiante.antecedentesEstudiantePorcentajeDiscapacidad,
          antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion: estudiante.antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion,
          antecedentesEstudianteDatosRelevantes: estudiante.antecedentesEstudianteDatosRelevantes,
          antecedentesEstudianteTomaMedicamento: estudiante.antecedentesEstudianteTomaMedicamento,
          antecedentesEstudianteMedicamentoDescripcion: estudiante.antecedentesEstudianteMedicamentoDescripcion,
          antecedentesEstudianteMedicamentoRazon: estudiante.antecedentesEstudianteMedicamentoRazon,
          antecedentesEstudianteRepiteAnios: estudiante.antecedentesEstudianteRepiteAnios,
          antecedentesEstudianteAniosRepetidos: estudiante.antecedentesEstudianteAniosRepetidos,
          antecedentesEstudianteSeguimiento: estudiante.antecedentesEstudianteSeguimiento,
        })

      },
    });

    this.loadCatalogoGrupoEtnico();
    this.loadCatalogoSexo();
    this.loadCatalogoEstadoCivil();
    this.loadCatalogoNivelInstruccion();

    // Escuchar cambios en el select
    this.datosFamiliaresForm.get('familiaUnionPadres')?.valueChanges.subscribe(value => {
      const familiaUnionPadresOtro = this.datosFamiliaresForm.get('familiaUnionPadresOtro');
      if (value === 'otro') {
        familiaUnionPadresOtro?.setValidators([Validators.required]);
        familiaUnionPadresOtro?.enable();
      } else {
        familiaUnionPadresOtro?.clearValidators();
        familiaUnionPadresOtro?.disable();
        familiaUnionPadresOtro?.patchValue('')
      }
      familiaUnionPadresOtro?.updateValueAndValidity();
    });

    this.datosFamiliaresForm.get('familiaNumeroFamiliaresDiscapacidad')?.valueChanges.subscribe(value => {
      const familiaFamiliaresDiscacidadDescripcion = this.datosFamiliaresForm.get('familiaFamiliaresDiscacidadDescripcion')
      if (value === '1') {
        familiaFamiliaresDiscacidadDescripcion?.setValidators([Validators.required]);
        familiaFamiliaresDiscacidadDescripcion?.enable();
      } else {
        familiaFamiliaresDiscacidadDescripcion?.clearValidators();
        familiaFamiliaresDiscacidadDescripcion?.disable();
        familiaFamiliaresDiscacidadDescripcion?.patchValue('')
      }
      familiaFamiliaresDiscacidadDescripcion?.updateValueAndValidity();
    })

    this.datosFamiliaresForm.get('familiaTipoVivienda')?.valueChanges.subscribe(value => {
      const familiaFamiliaresDiscacidadDescripcion = this.datosFamiliaresForm.get('familiaTipoViviendaOtro')
      if (value === 'otro') {
        familiaFamiliaresDiscacidadDescripcion?.setValidators([Validators.required]);
        familiaFamiliaresDiscacidadDescripcion?.enable();
      } else {
        familiaFamiliaresDiscacidadDescripcion?.clearValidators();
        familiaFamiliaresDiscacidadDescripcion?.disable();
        familiaFamiliaresDiscacidadDescripcion?.patchValue('')
      }
      familiaFamiliaresDiscacidadDescripcion?.updateValueAndValidity();
    })

    this.antecedentesMadreForm.get('antecedentesMadreDificultadEmbarazo')?.valueChanges.subscribe(value => {
      const antecedentesMadreDificultadEmbarazoDescripcion = this.antecedentesMadreForm.get('antecedentesMadreDificultadEmbarazoDescripcion')
      if (value === '1') {
        antecedentesMadreDificultadEmbarazoDescripcion?.setValidators([Validators.required]);
        antecedentesMadreDificultadEmbarazoDescripcion?.enable();
      } else {
        antecedentesMadreDificultadEmbarazoDescripcion?.clearValidators();
        antecedentesMadreDificultadEmbarazoDescripcion?.disable();
        antecedentesMadreDificultadEmbarazoDescripcion?.patchValue('')
      }
      antecedentesMadreDificultadEmbarazoDescripcion?.updateValueAndValidity();
    })

    this.antecedentesMadreForm.get('antecedentesMadreDificultadParto')?.valueChanges.subscribe(value => {
      const antecedentesMadreDificultadPartoDescripcion = this.antecedentesMadreForm.get('antecedentesMadreDificultadPartoDescripcion')
      if (value === '1') {
        antecedentesMadreDificultadPartoDescripcion?.setValidators([Validators.required]);
        antecedentesMadreDificultadPartoDescripcion?.enable();
      } else {
        antecedentesMadreDificultadPartoDescripcion?.clearValidators();
        antecedentesMadreDificultadPartoDescripcion?.disable();
        antecedentesMadreDificultadPartoDescripcion?.patchValue('')
      }
      antecedentesMadreDificultadPartoDescripcion?.updateValueAndValidity();
    })

    this.antecedentesEstudianteForm.get('antecedentesEstudianteNecesidadEducativaEspecial')?.valueChanges.subscribe(value => {
      const antecedentesEstudianteNumeroCarne = this.antecedentesEstudianteForm.get('antecedentesEstudianteNumeroCarne')
      const antecedentesEstudiantePorcentajeDiscapacidad = this.antecedentesEstudianteForm.get('antecedentesEstudiantePorcentajeDiscapacidad')
      const antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion = this.antecedentesEstudianteForm.get('antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion')
      if (value === '1') {
        antecedentesEstudianteNumeroCarne?.setValidators([Validators.required]);
        antecedentesEstudianteNumeroCarne?.enable();

        antecedentesEstudiantePorcentajeDiscapacidad?.setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
        antecedentesEstudiantePorcentajeDiscapacidad?.enable();

        antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion?.setValidators([Validators.required]);
        antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion?.enable();
      } else {
        antecedentesEstudianteNumeroCarne?.clearValidators();
        antecedentesEstudianteNumeroCarne?.disable();
        antecedentesEstudianteNumeroCarne?.patchValue('')

        antecedentesEstudiantePorcentajeDiscapacidad?.clearValidators();
        antecedentesEstudiantePorcentajeDiscapacidad?.disable();
        antecedentesEstudiantePorcentajeDiscapacidad?.patchValue('')

        antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion?.clearValidators();
        antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion?.disable();
        antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion?.patchValue('')
      }
      antecedentesEstudianteNumeroCarne?.updateValueAndValidity();
      antecedentesEstudiantePorcentajeDiscapacidad?.updateValueAndValidity();
      antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion?.updateValueAndValidity();
    })

    this.antecedentesEstudianteForm.get('antecedentesEstudianteTomaMedicamento')?.valueChanges.subscribe(value => {
      const antecedentesEstudianteMedicamentoDescripcion = this.antecedentesEstudianteForm.get('antecedentesEstudianteMedicamentoDescripcion')
      const antecedentesEstudianteMedicamentoRazon = this.antecedentesEstudianteForm.get('antecedentesEstudianteMedicamentoRazon')
      if (value === '1') {
        antecedentesEstudianteMedicamentoDescripcion?.setValidators([Validators.required]);
        antecedentesEstudianteMedicamentoDescripcion?.enable();
        antecedentesEstudianteMedicamentoRazon?.setValidators([Validators.required]);
        antecedentesEstudianteMedicamentoRazon?.enable();
      } else {
        antecedentesEstudianteMedicamentoDescripcion?.clearValidators();
        antecedentesEstudianteMedicamentoDescripcion?.disable();
        antecedentesEstudianteMedicamentoDescripcion?.patchValue('')
        antecedentesEstudianteMedicamentoRazon?.clearValidators();
        antecedentesEstudianteMedicamentoRazon?.disable();
        antecedentesEstudianteMedicamentoRazon?.patchValue('')
      }
      antecedentesEstudianteMedicamentoDescripcion?.updateValueAndValidity();
      antecedentesEstudianteMedicamentoRazon?.updateValueAndValidity();
    })

    this.antecedentesEstudianteForm.get('antecedentesEstudianteRepiteAnios')?.valueChanges.subscribe(value => {
      const antecedentesEstudianteAniosRepetidos = this.antecedentesEstudianteForm.get('antecedentesEstudianteAniosRepetidos')

      if (value === '1') {
        antecedentesEstudianteAniosRepetidos?.setValidators([Validators.required]);
        antecedentesEstudianteAniosRepetidos?.enable();
      } else {
        antecedentesEstudianteAniosRepetidos?.clearValidators();
        antecedentesEstudianteAniosRepetidos?.disable();
        antecedentesEstudianteAniosRepetidos?.patchValue('')
      }
      antecedentesEstudianteAniosRepetidos?.updateValueAndValidity();
    })
  }

  madreRepresentante() {
    this.representanteForm.patchValue({
      nombresRepresentante: this.nombresMadre.value,
      apellidosRepresentante: this.apellidosMadre.value,
      cedulaRepresentante: this.cedulaMadre.value,
      parentescoRepresentante: 'MADRE',
      estadoCivilRepresentante: this.estadoCivilMadre.value,
      nivelInstruccionRepresentante: this.nivelInstruccionMadre.value,
      ocupacionRepresentante: this.ocupacionMadre.value,
      correoElectronicoRepresentante: this.correoElectronicoMadre.value,
      direccionDomicilioRepresentante: this.direccionDomicilioMadre.value,
      telefonoDomicilioRepresentante: this.telefonoDomicilioMadre.value,
      lugarTrabajoRepresentante: this.lugarTrabajoMadre.value,
      telefonoTrabajoRepresentante: this.telefonoTrabajoMadre.value
    })
    this.messageServicePNG.add({ severity: 'success', summary: 'Representante', detail: 'Los datos de la madre se han cargado en como Representante del Estudiante' });
  }
  padreRepresentante() {
    this.representanteForm.patchValue({
      nombresRepresentante: this.nombresPadre.value,
      apellidosRepresentante: this.apellidosPadre.value,
      cedulaRepresentante: this.cedulaPadre.value,
      parentescoRepresentante: 'PADRE',
      estadoCivilRepresentante: this.estadoCivilPadre.value,
      nivelInstruccionRepresentante: this.nivelInstruccionPadre.value,
      ocupacionRepresentante: this.ocupacionPadre.value,
      correoElectronicoRepresentante: this.correoElectronicoPadre.value,
      direccionDomicilioRepresentante: this.direccionDomicilioPadre.value,
      telefonoDomicilioRepresentante: this.telefonoDomicilioPadre.value,
      lugarTrabajoRepresentante: this.lugarTrabajoPadre.value,
      telefonoTrabajoRepresentante: this.telefonoTrabajoPadre.value
    })
    this.messageServicePNG.add({ severity: 'success', summary: 'Representante', detail: 'Los datos del padre se han cargado en como Representante del Estudiante' });
  }

  dialogAsignarCurso() {
    this.asignarCursoDialog = true;
    this.submitted = false;
    const dialogRef = this.dialog.open(AsignarCursoComponent, {
      width: '90%',
    });
    dialogRef.afterClosed().subscribe((cursoSeleccionado) => {
      if (cursoSeleccionado) {
        this.cursoSeleccionado = cursoSeleccionado
        this.estudianteForm.patchValue({
          curso_id: this.cursoSeleccionado.id,
          curso: this.cursoSeleccionado.nivel.nombre + ' - ' + this.cursoSeleccionado.subnivel.nombre + ' - ' + this.cursoSeleccionado.grado.nombre + ' - ' + this.cursoSeleccionado.paralelo.nombre + ' - ' + this.cursoSeleccionado.jornada.nombre
        })
      }
    })
  }

  guardarDatosEstudiante() {
    console.log('Estudiante', this.estudianteForm)
    if (this.estudianteForm.valid) {
      this.estudianteForm.addControl('form_id', new FormControl('1'))
      this.loadingService.show();
      setTimeout(() => {
        this.estudianteService.updateEstudent(this.estudianteForm.value).subscribe({
          next: (req) => {
            this.messageServicePNG.add({ severity: 'success', summary: 'Datos del Estudiante', detail: 'La información del Estudiante se han guardado exitosamente' });
          },
          error: (error) => {
            this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la información del Estudiante' });
          }
        })
        this.loadingService.hide();
      }, 150);
    } else {
      this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Verifique la información' });
    }
  }

  guardarDatosMadre() {
    console.log('Madre', this.madreForm)
    if (this.madreForm.valid) {
      this.madreForm.addControl('id', new FormControl(this.estudiante_id))
      this.madreForm.addControl('form_id', new FormControl('2'))
      this.loadingService.show();
      setTimeout(() => {
        this.estudianteService.updateEstudent(this.madreForm.value).subscribe({
          next: (req) => {
            this.messageServicePNG.add({ severity: 'success', summary: 'Datos de la Madre', detail: 'La información se ha guardado exitosamente' });
          },
          error: (error) => {
            this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la información de la Madre' });
          }
        })
        this.loadingService.hide();
      }, 150);
    } else {
      this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Verifique la información' });
    }
  }

  guardarDatosPadre() {
    console.log('Padre', this.padreForm)
    if (this.padreForm.valid) {
      this.padreForm.addControl('id', new FormControl(this.estudiante_id))
      this.padreForm.addControl('form_id', new FormControl('3'))
      this.loadingService.show();
      setTimeout(() => {
        this.estudianteService.updateEstudent(this.padreForm.value).subscribe({
          next: (req) => {
            this.messageServicePNG.add({ severity: 'success', summary: 'Datos del Padre', detail: 'La información se ha guardado exitosamente' });
          },
          error: (error) => {
            this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la información del Padre' });
          }
        })
        this.loadingService.hide();
      }, 150);
    } else {
      this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Verifique la información' });
    }
  }


  guardarDatosRepresentante() {
    console.log('Representante', this.representanteForm)
    if (this.representanteForm.valid) {
      this.representanteForm.addControl('id', new FormControl(this.estudiante_id))
      this.representanteForm.addControl('form_id', new FormControl('4'))
      this.loadingService.show();
      setTimeout(() => {
        this.estudianteService.updateEstudent(this.representanteForm.value).subscribe({
          next: (req) => {
            this.messageServicePNG.add({ severity: 'success', summary: 'Datos del Representante', detail: 'La información se ha guardado exitosamente' });
          },
          error: (error) => {
            this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la información del Representante' });
          }
        })
        this.loadingService.hide();
      }, 150);
    } else {
      this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Verifique la información' });
    }
  }

  guardarDatosFamiliares() {
    console.log('datos Familiares', this.datosFamiliaresForm)
    if (this.datosFamiliaresForm.valid) {
      this.datosFamiliaresFormAux.addControl('id', new FormControl(this.estudiante_id))
      this.datosFamiliaresFormAux.addControl('form_id', new FormControl('5'))
      this.loadingService.show();




      this.datosFamiliaresFormAux.patchValue({
        familiaUnionPadres: this.familiaUnionPadres.value,
        familiaUnionPadresOtro: this.familiaUnionPadresOtro.value,
        familiaNumeroHijos: this.familiaNumeroHijos.value,
        familiaNumeroHijosVarones: this.familiaNumeroHijosVarones.value,
        familiaNumeroHijosMujeres: this.familiaNumeroHijosMujeres.value,
        familiaNumeroPuestoEntreHermanos: this.familiaNumeroPuestoEntreHermanos.value,
        familiaDetallePersonsasVivenConEstudiante: this.familiaDetallePersonsasVivenConEstudiante.value,
        familiaNumeroFamiliaresDiscapacidad: this.familiaNumeroFamiliaresDiscapacidad.value,
        familiaFamiliaresDiscacidadDescripcion: this.familiaFamiliaresDiscacidadDescripcion.value,
        familiaTipoVivienda: this.familiaTipoVivienda.value,
        familiaTipoViviendaOtro: this.familiaTipoVivienda.value,
        familiaServiciosBasicos: this.familiaServiciosBasicos.value.join(',')
      })

      console.log('datos Familiares AUX', this.datosFamiliaresFormAux)

      setTimeout(() => {
        this.estudianteService.updateEstudent(this.datosFamiliaresFormAux.value).subscribe({
          next: (req) => {
            this.messageServicePNG.add({ severity: 'success', summary: 'Datos Familiares', detail: 'La información se ha guardado exitosamente' });
          },
          error: (error) => {
            this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la información Familiar' });
          }
        })
        this.loadingService.hide();
      }, 150);
    } else {
      this.messageServicePNG.add({ severity: 'error', summary: 'Error', detail: 'Verifique la información' });
    }


    //this.serviciosBasicosSeleccionados = estudiante.familiaServiciosBasicos ? estudiante.familiaServiciosBasicos.split(',').map((item: string) => item.trim()) : '';
  }

  //* Form ESTUDIANTE
  get nombres() {
    return this.estudianteForm.controls['nombres'];
  }
  get apellidos() {
    return this.estudianteForm.controls['apellidos'];
  }
  get lugarNacimiento() {
    return this.estudianteForm.controls['lugarNacimiento'];
  }
  get fechaNacimiento() {
    return this.estudianteForm.controls['lugarNacimiento'];
  }
  get cedula() {
    return this.estudianteForm.controls['cedula'];
  }
  get curso() {
    return this.estudianteForm.controls['curso'];
  }
  get grupoEtnico() {
    return this.estudianteForm.controls['grupoEtnico'];
  }
  get sexo() {
    return this.estudianteForm.controls['sexo'];
  }
  get direccionDomicilio() {
    return this.estudianteForm.controls['direccionDomicilio'];
  }
  get telefonoDomicilio() {
    return this.estudianteForm.controls['telefonoDomicilio'];
  }
  get telefonoCelularMadre() {
    return this.estudianteForm.controls['telefonoCelularMadre'];
  }
  get telefonoCelularPadre() {
    return this.estudianteForm.controls['telefonoCelularPadre'];
  }
  get user_estado_usuario() {
    return this.estudianteForm.controls['user_estado_usuario'];
  }

  //* Form MADRE

  get nombresMadre() {
    return this.madreForm.controls['nombresMadre'];
  }
  get apellidosMadre() {
    return this.madreForm.controls['apellidosMadre'];
  }
  get cedulaMadre() {
    return this.madreForm.controls['cedulaMadre'];
  }
  get fechaNacimientoMadre() {
    return this.madreForm.controls['fechaNacimientoMadre'];
  }
  get estadoCivilMadre() {
    return this.madreForm.controls['estadoCivilMadre'];
  }
  get nivelInstruccionMadre() {
    return this.madreForm.controls['nivelInstruccionMadre'];
  }
  get ocupacionMadre() {
    return this.madreForm.controls['ocupacionMadre'];
  }
  get correoElectronicoMadre() {
    return this.madreForm.controls['correoElectronicoMadre'];
  }
  get direccionDomicilioMadre() {
    return this.madreForm.controls['direccionDomicilioMadre'];
  }
  get telefonoDomicilioMadre() {
    return this.madreForm.controls['telefonoDomicilioMadre'];
  }
  get lugarTrabajoMadre() {
    return this.madreForm.controls['lugarTrabajoMadre'];
  }
  get telefonoTrabajoMadre() {
    return this.madreForm.controls['telefonoTrabajoMadre'];
  }

  //* Form PADRE

  get nombresPadre() {
    return this.padreForm.controls['nombresPadre'];
  }
  get apellidosPadre() {
    return this.padreForm.controls['apellidosPadre'];
  }
  get cedulaPadre() {
    return this.padreForm.controls['cedulaPadre'];
  }
  get fechaNacimientoPadre() {
    return this.padreForm.controls['fechaNacimientoPadre'];
  }
  get estadoCivilPadre() {
    return this.padreForm.controls['estadoCivilPadre'];
  }
  get nivelInstruccionPadre() {
    return this.padreForm.controls['nivelInstruccionPadre'];
  }
  get ocupacionPadre() {
    return this.padreForm.controls['ocupacionPadre'];
  }
  get correoElectronicoPadre() {
    return this.padreForm.controls['correoElectronicoPadre'];
  }
  get direccionDomicilioPadre() {
    return this.padreForm.controls['direccionDomicilioPadre'];
  }
  get telefonoDomicilioPadre() {
    return this.padreForm.controls['telefonoDomicilioPadre'];
  }
  get lugarTrabajoPadre() {
    return this.padreForm.controls['lugarTrabajoPadre'];
  }
  get telefonoTrabajoPadre() {
    return this.padreForm.controls['telefonoTrabajoPadre'];
  }

  //* Form REPRESENTANTE

  get nombresRepresentante() {
    return this.representanteForm.controls['nombresRepresentante'];
  }
  get apellidosRepresentante() {
    return this.representanteForm.controls['apellidosRepresentante'];
  }
  get cedulaRepresentante() {
    return this.representanteForm.controls['cedulaRepresentante'];
  }
  get fechaNacimientoRepresentante() {
    return this.representanteForm.controls['fechaNacimientoRepresentante'];
  }
  get estadoCivilRepresentante() {
    return this.representanteForm.controls['estadoCivilRepresentante'];
  }
  get nivelInstruccionRepresentante() {
    return this.representanteForm.controls['nivelInstruccionRepresentante'];
  }
  get ocupacionRepresentante() {
    return this.representanteForm.controls['ocupacionRepresentante'];
  }
  get correoElectronicoRepresentante() {
    return this.representanteForm.controls['correoElectronicoRepresentante'];
  }
  get direccionDomicilioRepresentante() {
    return this.representanteForm.controls['direccionDomicilioRepresentante'];
  }
  get telefonoDomicilioRepresentante() {
    return this.representanteForm.controls['telefonoDomicilioRepresentante'];
  }
  get lugarTrabajoRepresentante() {
    return this.representanteForm.controls['lugarTrabajoRepresentante'];
  }
  get telefonoTrabajoRepresentante() {
    return this.representanteForm.controls['telefonoTrabajoRepresentante'];
  }
  get parentescoRepresentante() {
    return this.representanteForm.controls['parentescoRepresentante'];
  }
  get telefonoCelularRepresentante() {
    return this.representanteForm.controls['telefonoCelularRepresentante'];
  }

  //* Form Datos Familiares

  get familiaUnionPadres() {
    return this.datosFamiliaresForm.controls['familiaUnionPadres'];
  }

  get familiaUnionPadresOtro() {
    return this.datosFamiliaresForm.controls['familiaUnionPadresOtro'];
  }
  get familiaNumeroHijos() {
    return this.datosFamiliaresForm.controls['familiaNumeroHijos']
  }
  get familiaNumeroHijosVarones() {
    return this.datosFamiliaresForm.controls['familiaNumeroHijosVarones']
  }
  get familiaNumeroHijosMujeres() {
    return this.datosFamiliaresForm.controls['familiaNumeroHijosMujeres']
  }
  get familiaNumeroPuestoEntreHermanos() {
    return this.datosFamiliaresForm.controls['familiaNumeroPuestoEntreHermanos']
  }
  get familiaDetallePersonsasVivenConEstudiante() {
    return this.datosFamiliaresForm.controls['familiaDetallePersonsasVivenConEstudiante']
  }
  get familiaNumeroFamiliaresDiscapacidad() {
    return this.datosFamiliaresForm.controls['familiaNumeroFamiliaresDiscapacidad']
  }
  get familiaFamiliaresDiscacidadDescripcion() {
    return this.datosFamiliaresForm.controls['familiaFamiliaresDiscacidadDescripcion']
  }
  get familiaTipoVivienda() {
    return this.datosFamiliaresForm.controls['familiaTipoVivienda']
  }
  get familiaServiciosBasicos() {
    return this.datosFamiliaresForm.controls['familiaServiciosBasicos']
  }


  //* FORM ANTECEDENTES MADRE
  get antecedentesMadreDificultadEmbarazo() {
    return this.antecedentesMadreForm.controls['antecedentesMadreDificultadEmbarazo']
  }
  get antecedentesMadreDificultadEmbarazoDescripcion() {
    return this.antecedentesMadreForm.controls['antecedentesMadreDificultadEmbarazoDescripcion']
  }
  get antecedentesMadreDificultadParto() {
    return this.antecedentesMadreForm.controls['antecedentesMadreDificultadParto']
  }
  get antecedentesMadreDificultadPartoDescripcion() {
    return this.antecedentesMadreForm.controls['antecedentesMadreDificultadPartoDescripcion']
  }

  //* FORM ANTECEDENTES ESTUDIANTE

  get antecedentesEstudianteDatosNinez() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteDatosNinez']
  }
  get antecedentesEstudianteHistoriaEscolar() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteHistoriaEscolar']
  }
  get antecedentesEstudianteNecesidadEducativaEspecial() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteNecesidadEducativaEspecial']
  }
  get antecedentesEstudianteNumeroCarne() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteNumeroCarne']
  }
  get antecedentesEstudiantePorcentajeDiscapacidad() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudiantePorcentajeDiscapacidad']
  }
  get antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion']
  }
  get antecedentesEstudianteDatosRelevantes() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteDatosRelevantes']
  }
  get antecedentesEstudianteTomaMedicamento() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteTomaMedicamento']
  }
  get antecedentesEstudianteMedicamentoDescripcion() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteMedicamentoDescripcion']
  }
  get antecedentesEstudianteMedicamentoRazon() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteMedicamentoRazon']
  }
  get antecedentesEstudianteRepiteAnios() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteRepiteAnios']
  }
  get antecedentesEstudianteAniosRepetidos() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteAniosRepetidos']
  }
  get antecedentesEstudianteSeguimiento() {
    return this.antecedentesEstudianteForm.controls['antecedentesEstudianteSeguimiento']
  }
  get seguimiento() {
    return this.seguimientoForm.controls['seguimiento']
  }

  private loadCatalogoGrupoEtnico() {
    this.catalogoService.getGrupoEtnicoLista().subscribe({
      next: (data) => {
        this.catalogoGrupoEtnico = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos - Grupo Etnico', error);
      },
    });
  }
  private loadCatalogoSexo() {
    this.catalogoService.getSexoLista().subscribe({
      next: (data) => {
        this.catalogoSexo = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos - Sexo', error);
      },
    });
  }
  private loadCatalogoEstadoCivil() {
    this.catalogoService.getEstadoCivilLista().subscribe({
      next: (data) => {
        this.catalogoEstadoCivil = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos - Estado Civil', error);
      },
    });
  }
  private loadCatalogoNivelInstruccion() {
    this.catalogoService.getNivelEducacionLista().subscribe({
      next: (data) => {
        this.catalogoNivelInstruccion = data;
      },
      error: (error) => {
        console.error('Error fetching catalogos - Nivel Instruccion', error);
      },
    });
  }
}
