import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../../../../services/auth/login.service';
import { LoginRequest } from '../../../../services/auth/loginRequest';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { Codec } from '../../../../services/codec/codec';
import { NotaService } from '../../../../services/nota/nota.service';

@Component({
  selector: 'app-mis-calificaciones',
  templateUrl: './mis-calificaciones.component.html',
  styleUrl: './mis-calificaciones.component.css',
})
export class MisCalificacionesComponent implements OnInit {
  estudiante!: any;
  notas: any[] = [];
  codec: Codec;
  cedulaCodificada: any;

  constructor(
    private loginService: LoginService,
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private notaService: NotaService
  ) {
    this.codec = new Codec();
  }
  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.cedulaCodificada = +params['cedulaCodificada']; // El signo '+' convierte el string a número

      this.estudianteService
        .getEstudianteByCedula(
          this.codec.decode(this.cedulaCodificada.toString())
        )
        .subscribe({
          next: (estudiante) => {
            if (estudiante) {
              this.estudiante = estudiante;
              console.log('this.estudiante', this.estudiante);
              this.notaService
                .getNotasByEstudiante(this.estudiante.id)
                .subscribe({
                  next: (notas) => {
                    this.notas = notas;
                    console.log('this.notas', this.notas);
                  },
                });
            }
          },
        });
    });

    /* const { value: cedula } = await Swal.fire({
      title: 'Buscar estudiante',
      input: 'text',
      inputLabel: 'cédula/pasaporte',
      inputPlaceholder: 'Ingrese su número de cédula / pasaporte',
      inputAttributes: {
        maxlength: '15',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
    });

    if (cedula) {

      this.estudianteService.getEstudianteByCedula(cedula).subscribe({
        next:async (estudiante)=>{
          if(estudiante){
            
            this.estudiante = estudiante
            const { value: palabraSeguridad } = await Swal.fire({
              title: 'Palabra de seguridad',
              input: 'text',
              inputLabel: 'Ingrese su palabra de seguridad',
              inputPlaceholder: 'Palabra de seguridad',
              inputAttributes: {
                maxlength: '10',
                autocapitalize: 'off',
                autocorrect: 'off',
              },
            });

            if (palabraSeguridad === this.estudiante.palabraSeguridad) {
              Swal.fire('OK');
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al validar la palabra de seguridad del estudiante!",
              });
            }
            
            
          }else{
            Swal.fire('No se encontró Estudiante');
          }

        }
      })

    } */
  }

  convertirCulitativo(nota: number): string {
    if (nota >= 9.5) {
      return 'A+';
    } else if (nota >= 8.5) {
      return 'A-';
    } else if (nota >= 7.5) {
      return 'B+';
    } else if (nota >= 6.5) {
      return 'B-';
    } else if (nota >= 5.5) {
      return 'C+';
    } else if (nota >= 4.5) {
      return 'C-';
    } else if (nota >= 3.5) {
      return 'D+';
    } else if (nota >= 2.5) {
      return 'D-';
    } else if (nota >= 1.5) {
      return 'E+';
    } else if (nota >= 0) {
      return 'E-';
    }

    return '-';
  }

  getNotaColorBackground(nota: number): string {
    if (nota >= 9) {
      return '#d4edda'; // Success - verde claro
    } else if (nota >= 7) {
      return '#fff3cd'; // Info - amarillo claro
    } else if (nota >= 5) {
      return '#ffeeba'; // Warning - amarillo oscuro
    } else if (nota > 0) {
      return '#f8d7da'; // Danger - rojo claro
    } else {
      return '#e9ecef'; // Secondary - gris claro
    }
  }

  getNotaColorText(nota: number): string {
    if (nota >= 9) {
      return '#155724'; // Success - verde oscuro
    } else if (nota >= 7) {
      return '#856404'; // Info - amarillo oscuro
    } else if (nota >= 5) {
      return '#6c757d'; // Warning - gris oscuro
    } else if (nota > 0) {
      return '#721c24'; // Danger - rojo oscuro
    } else {
      return '#6c757d'; // Secondary - gris oscuro
    }
  }

  estado(estudiante: any, notaFinal: number) {
    // console.log(estudiante.estado)
    if (estudiante.estado === 0) {
      return 'DESERTOR';
    }

    if (notaFinal >= 7) {
      return 'Aprobado';
    } else if (notaFinal > 0) {
      return 'Reprobado';
    }
    return '-';
  }

  estadoColorBackground(estudiante: any, notaFinal: number) {
    if (estudiante.estado === 0) {
      return '#e9ecef';
    }

    if (notaFinal >= 7) {
      return '#d4edda';
    } else if (notaFinal > 0) {
      return '#f8d7da';
    }
    return '';
  }

  estadoColorText(estudiante: any, notaFinal: number) {
    if (estudiante.estado === 0) {
      return '#6c757d';
    }

    if (notaFinal >= 7) {
      return '#155724';
    } else if (notaFinal > 0) {
      return '#721c24';
    }
    return '#6c757d';
  }
}
