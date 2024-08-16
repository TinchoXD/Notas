import { Component, OnInit, signal } from '@angular/core';
import { AlertType } from '../../../shared/alert/alertType';
import { ThemePalette } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogoService } from '../../../services/catalogo/catalogo.service';
import { Catalogo } from '../../../services/catalogo/catalogo';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.css',
})
export class EstudianteFormComponent implements OnInit {
  color: ThemePalette = 'primary';

  catalogoGrupoEtnico: Catalogo[] = [];
  catalogoSexo: Catalogo[] = [];
  catalogoEstadoCivil: Catalogo[] = [];
  catalogoNivelInstruccion: Catalogo[] = [];

  //representanteMadre: boolean = true;
  representanteMadre = new FormControl(false);
  representantePadre = new FormControl(false);
  representanteAdicional = new FormControl(false);

  estudiante: any;

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
    curso: ['', Validators.required],
    grupoEtnico: ['', Validators.required],
    sexo: ['', Validators.required],
    direccionDomicilio: ['', Validators.required],
    telefonoDomicilio: ['', []],
    telefonoCelularMadre: ['', [Validators.pattern(/^[0-9]+$/)]],
    telefonoCelularPadre: ['', [Validators.pattern(/^[0-9]+$/)]],

    user_estado_usuario: [''],
  });

  madreForm: FormGroup = this.formBuilder.group({
    nombresMadre: ['', Validators.required],
    apellidosMadre: ['', Validators.required],
    cedulaMadre: ['', Validators.required],
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
  });

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

  estudianteId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogoService,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.estudianteId = +params['id']; // El signo '+' convierte el string a número
    });

    this.representanteMadre = new FormControl(true);
    this.representantePadre = new FormControl(true);
    this.representanteAdicional = new FormControl(true);

    this.estudianteService.getEstudianteById(this.estudianteId).subscribe({
      next: (estudiante) => {
        this.estudiante = estudiante;
        console.log('this.estudiante', this.estudiante);

        this.estudianteForm.patchValue({
          id: estudiante.id.toString(),
          nombres: estudiante.nombres,
          apellidos: estudiante.apellidos,
          lugarNacimiento: estudiante.lugarNacimiento,
          fechaNacimiento: estudiante.fechaNacimiento,
          cedula: estudiante.cedula,
          curso: estudiante.curso.id,
          grupoEtnico: estudiante.grupoEtnico.id,
          sexo: estudiante.sexo.id,
          direccionDomicilio: estudiante.domicilio,
          telefonoDomicilio: estudiante.telefonoDomicilio,
          telefonoCelularMadre: estudiante.telefonoCelularMadre,
          telefonoCelularPadre: estudiante.telefonoCelularPadre,
        });

        this.madreForm.patchValue({
          nombresMadre: estudiante.madreNombres,
          apellidosMadre: estudiante.madreApellidos,
          cedulaMadre: estudiante.madreCedula,
          estadoCivilMadre: estudiante.madreEstadoCivil,
          nivelInstruccionMadre: estudiante.madreNivelInstruccion.id,
          ocupacionMadre: estudiante.madreOcupacion,
          correoElectronicoMadre: estudiante.madreCorreo,
          direccionDomicilioMadre: estudiante.madreDireccionDomicilio,
          telefonoDomicilioMadre: estudiante.madreTelefonoDomicilio,
          lugarTrabajoMadre: estudiante.madreLugarTrabajo,
          telefonoTrabajoMadre: estudiante.madreTelefonoTrabajo,
        })

        this.padreForm.patchValue({
          nombresPadre: estudiante.padreNombres,
          apellidosPadre: estudiante.padreApellidos,
          cedulaPadre: estudiante.padreCedula,
          estadoCivilPadre: estudiante.padreEstadoCivil.id,
          nivelInstruccionPadre: estudiante.padreNivelInstruccion.id,
          ocupacionPadre: estudiante.padreOcupacion,
          correoElectronicoPadre: estudiante.padreCorreo,
          direccionDomicilioPadre: estudiante.padreDireccionDomicilio,
          telefonoDomicilioPadre: estudiante.padreTelefonoDomicilio,
          lugarTrabajoPadre: estudiante.padreLugarTrabajo,
          telefonoTrabajoPadre: estudiante.padreTelefonoTrabajo,
        })

        this.representanteForm.patchValue({
          nombresRepresentante: estudiante.representanteNombres,
          apellidosRepresentante: estudiante.representanteApellidos,
          cedulaRepresentante: estudiante.representanteCedula,
          estadoCivilRepresentante: estudiante.representanteEstadoCivil.id,
          nivelInstruccionRepresentante: estudiante.representanteNivelInstruccion.id,
          ocupacionRepresentante: estudiante.representanteOcupacion,
          correoElectronicoRepresentante: estudiante.representanteCorreo,
          direccionDomicilioRepresentante: estudiante.representanteDireccionDomicilio,
          telefonoDomicilioRepresentante: estudiante.representanteTelefonoDomicilio,
          lugarTrabajoRepresentante: estudiante.representanteLugarTrabajo,
          telefonoTrabajoRepresentante: estudiante.representanteTelefonoTrabajo,
        })


      },
    });

    this.loadCatalogoGrupoEtnico();
    this.loadCatalogoSexo();
    this.loadCatalogoEstadoCivil();
    this.loadCatalogoNivelInstruccion();
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
