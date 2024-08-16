import { Component, OnInit } from '@angular/core';
import { AlertType } from '../../../shared/alert/alertType';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogoService } from '../../../services/catalogo/catalogo.service';
import { Catalogo } from '../../../services/catalogo/catalogo';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.css'
})
export class EstudianteFormComponent implements OnInit{
  
  color: ThemePalette = 'primary';

  catalogoGrupoEtnico: Catalogo[] = [];
  catalogoSexo: Catalogo[] = [];


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
    telefonoDomicilio: ['', Validators.required],
    telefonoCelularMadre: ['', [ Validators.pattern(/^[0-9]+$/)]],
    telefonoCelularPadre: ['', [ Validators.pattern(/^[0-9]+$/)]],
   
   
    user_estado_usuario: [''],
  });

  madreForm: FormGroup = this.formBuilder.group({
    
    nombresMadre: ['', Validators.required],
    apellidosMadre: ['', Validators.required],
    cedulaMadre: ['', Validators.required],
    estadoCivilMadre: ['', Validators.required],
    nivelInstruccionMadre: ['', Validators.required],
    ocupaciónMadre: ['', Validators.required],
    correoElectronicoMadre: ['', Validators.required],
    direccionDomicilioMadre: ['', Validators.required],
    telefonoDomicilioMadre: ['', Validators.required],
    lugarTrabajoMadre: ['', Validators.required],
    telefonoTrabajoMadre: ['', Validators.required],
    
  });

  padreForm: FormGroup = this.formBuilder.group({
    
    nombresPadre: ['', Validators.required],
    apellidosPadre: ['', Validators.required],
    cedulaPadre: ['', Validators.required],
    estadoCivilPadre: ['', Validators.required],
    nivelInstruccionPadre: ['', Validators.required],
    ocupaciónPadre: ['', Validators.required],
    correoElectronicoPadre: ['', Validators.required],
    direccionDomicilioPadre: ['', Validators.required],
    telefonoDomicilioPadre: ['', Validators.required],
    lugarTrabajoPadre: ['', Validators.required],
    telefonoTrabajoPadre: ['', Validators.required],
  
  });


  
  
  errorMessage: String = 'Este campo es obligatorio.';

  get errorMessageTelefonoMadre(): string {
    if (this.telefonoCelularMadre.hasError('required')) {
      return 'El número de teléfono es obligatorio';
    } else if (this.telefonoCelularMadre.hasError('pattern')) {
      return 'Solo se permiten números';}
    return '';
  }

  get errorMessageTelefonoPadre(): string {
    if (this.telefonoCelularPadre.hasError('required')) {
      return 'El número de teléfono es obligatorio';
    } else if (this.telefonoCelularPadre.hasError('pattern')) {
      return 'Solo se permiten números';}
    return '';
  }
  
 estudianteId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogoService
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.estudianteId = +params['id']; // El signo '+' convierte el string a número
      console.log(this.estudianteId);
    });
    this.loadCatalogoGrupoEtnico(),
    this.loadCatalogoSexo();
    
  }


    //* Form ESTUDIANTE
    get nombres(){
      return this.estudianteForm.controls['nombres']
    }
    get apellidos(){
      return this.estudianteForm.controls['apellidos']
    }
    get lugarNacimiento(){
      return this.estudianteForm.controls['lugarNacimiento']
    }
    get fechaNacimiento(){
      return this.estudianteForm.controls['lugarNacimiento']
    }
    get cedula(){
      return this.estudianteForm.controls['cedula']
    }
    get curso(){
      return this.estudianteForm.controls['curso']
    }
    get grupoEtnico(){
      return this.estudianteForm.controls['grupoEtnico']
    }
    get sexo(){
      return this.estudianteForm.controls['sexo']
    }
    get direccionDomicilio(){
      return this.estudianteForm.controls['direccionDomicilio']
    }
    get telefonoDomicilio(){
      return this.estudianteForm.controls['telefonoDomicilio']
    }
    get telefonoCelularMadre(){
      return this.estudianteForm.controls['telefonoCelularMadre']
    }
    get telefonoCelularPadre(){
      return this.estudianteForm.controls['telefonoCelularPadre']
    }
    get user_estado_usuario(){
      return this.estudianteForm.controls['user_estado_usuario']
    }

     //* Form MADRE

     get nombresMadre(){
      return this.estudianteForm.controls['nombres']
    }
    get apellidosMadre(){
      return this.estudianteForm.controls['apellidos']
    }
    get cedulaMadre(){
      return this.estudianteForm.controls['lugarNacimiento']
    }
    get fechaNacimientoMadre(){
      return this.estudianteForm.controls['lugarNacimiento']
    }
    get estadoCivilMadre(){
      return this.estudianteForm.controls['cedula']
    }
    get nivelInstruccionMadre(){
      return this.estudianteForm.controls['curso']
    }
    get ocupacionMadre(){
      return this.estudianteForm.controls['grupoEtnico']
    }
    get correoMadre(){
      return this.estudianteForm.controls['sexo']
    }
    get direccionDomicilioMadre(){
      return this.estudianteForm.controls['direccionDomicilio']
    }
    get telefonoDomicilioMadre(){
      return this.estudianteForm.controls['telefonoDomicilio']
    }
    get lugarTrabajoMadre(){
      return this.estudianteForm.controls['telefonoCelularMadre']
    }
    get telefonoTrabajoMadre(){
      return this.estudianteForm.controls['telefonoCelularPadre']
    }
  



    private loadCatalogoGrupoEtnico() {
      this.catalogoService.getGrupoEtnicoLista().subscribe({
        next: (data) => {
          this.catalogoGrupoEtnico = data;
        },
        error: (error) => {
          console.error('Error fetching catalogos', error);
        }
      });
    }
    private loadCatalogoSexo() {
      this.catalogoService.getSexoLista().subscribe({
        next: (data) => {
          this.catalogoSexo = data;
        },
        error: (error) => {
          console.error('Error fetching catalogos', error);
        }
      });
    }

}
