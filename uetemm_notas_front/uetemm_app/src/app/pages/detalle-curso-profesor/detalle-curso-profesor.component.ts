import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { CursoProfesorService } from '../../services/cursoProfesor/curso-profesor.service';
import { UserService } from '../../services/user/user.service';
import { NotaService } from '../../services/nota/nota.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert/alert.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-curso-profesor',
  templateUrl: './detalle-curso-profesor.component.html',
  styleUrl: './detalle-curso-profesor.component.css',
})
export class DetalleCursoProfesorComponent implements OnInit {
  loading: boolean = true;

  id!: number;
  codigo!: string;

  cursoProfesor_id: any;
  cursoProfesor: any;
  cursosProfesor: any[] = [];

  notaT1: any;
  notaT2: any;
  notaT3: any;

  notas: any[] = [];

  user: any;

  estudiante: any;
  estudiantes: any[] = [];

  estudianteNotas: any[] = [];

  cursoEstudianteNota: any[] = [];

  notaEstudiante: any[] = [];

  cupr_id: any;
  notaColor: string = 'red';

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private userService: UserService,
    private cursoProfesorService: CursoProfesorService,
    private estudianteService: EstudianteService,
    private notaService: NotaService,
    private messageServicePNG: MessageService
  ) {}

  ngOnInit(): void {
    /*
    METODO ALTERNATIVO PARA LA NAVEGACION POR PARÁMETROS EN LA URL
    this.route.queryParamMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.codigo = params.get('codigo')!;
    }); */

    this.activatedRoute.params.subscribe((params) => {
      this.cursoProfesor_id = +params['id']; // El signo '+' convierte el string a número

      this.cursoProfesorService
        .getCursoProfesorById(this.cursoProfesor_id)
        .subscribe({
          next: (data) => {
            this.cursoProfesor = data;
            this.cursosProfesor.push(this.cursoProfesor);

            console.log('aaaa', this.cursoProfesor);
            this.cupr_id = this.cursoProfesor.id;

            this.estudianteService
              .getEstudiantesByCursoId(this.cursoProfesor.curso.id)
              .subscribe({
                next: (estudiantes) => {
                  this.estudiantes = estudiantes;
                  console.log('bbbb', this.estudiantes);

                  this.estudiantes.forEach((estudiante) => {
                    this.notaService
                      .getNotaByEstudianteAndCursoProfesor(
                        estudiante.id,
                        this.cupr_id
                      )
                      .subscribe({
                        next: (notaEstudiante) => {
                          this.notaEstudiante.push(notaEstudiante);
                          this.estudiantes.forEach((estu) => {

                            estu.notaT1 = this.notaEstudiante.find((nota)=> nota?.estudiante.id === estu.id && nota.cursoProfesor.id === this.cursoProfesor_id)?.calificacionT1
                            estu.notaT2 = this.notaEstudiante.find((nota)=> nota?.estudiante.id === estu.id && nota.cursoProfesor.id === this.cursoProfesor_id)?.calificacionT2
                            estu.notaT3 = this.notaEstudiante.find((nota)=> nota?.estudiante.id === estu.id && nota.cursoProfesor.id === this.cursoProfesor_id)?.calificacionT3
                          
                          });
                        },
                      });
                  });
                  console.log('ccc', this.notaEstudiante);
                },
              });
          },
        });

      /* 
        



        private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
        
        */

      /*       this.notaService.getNotasByEstudianteAndCursoProfesor(
        this.estudiante,
        this.cursoProfesor_id
      ); */
    });

    this.loading = false;
  }

  guardarNota(notaEstudiante: any) {
    console.log('estudiante', notaEstudiante);
    console.log('------');
    /* console.log('this.cursoProfesor_id', this.cursoProfesor_id);
    console.log('estudiante ID', estudiante.id);
    console.log('nota t1', estudiante.notaT1);
    console.log('nota t2', estudiante.notaT2);
    console.log('nota t3', estudiante.notaT3);
    console.log(
      'nota t1 Cualitativa',
      this.convertirCulitativo(estudiante.notaT1)
    );
    console.log(
      'nota t2 Cualitativa',
      this.convertirCulitativo(estudiante.notaT2)
    );
    console.log(
      'nota t3 Cualitativa',
      this.convertirCulitativo(estudiante.notaT3)
    ); */

    const nota = {
      estu_id: notaEstudiante.id,
      cupr_id: this.cursoProfesor_id,
      notaT1: notaEstudiante.notaT1,
      notaT2: notaEstudiante.notaT2,
      notaT3: notaEstudiante.notaT3,
    };

    console.log('AAA', nota);

    this.notaService.saveNota(nota).subscribe({
      next: (res) => {
        this.messageServicePNG.add({
          severity: 'success',
          summary: 'OK',
          detail: 'Nota guardada',
        });
      },
    });
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

  changePage(notaEstudiante: any){
    this.guardarNota(notaEstudiante);
  }
}
