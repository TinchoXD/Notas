import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { CursoProfesorService } from '../../services/cursoProfesor/curso-profesor.service';
import { UserService } from '../../services/user/user.service';
import { NotaService } from '../../services/nota/nota.service';

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

  nota: any;
  notas: any[] = [];

  user: any;

  estudiante: any;
  estudiantes: any[] = [];

  estudianteNotas: any[] = [];

  cursoEstudianteNota: any[] = [];

  prueba: any[] = [];

  cupr_id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private userService: UserService,
    private cursoProfesorService: CursoProfesorService,
    private estudianteService: EstudianteService,
    private notaService: NotaService
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
                      .getNotasByEstudianteAndCursoProfesor(
                        estudiante.id,
                        this.cupr_id
                      )
                      .subscribe({
                        next: (data) => {
                          this.prueba.push(data);
                        },
                      });
                  });
                  console.log('ccc', this.prueba);
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
}
