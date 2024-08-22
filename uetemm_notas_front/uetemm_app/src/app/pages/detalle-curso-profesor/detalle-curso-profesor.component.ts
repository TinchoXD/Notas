import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { CursoProfesorService } from '../../services/cursoProfesor/curso-profesor.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-detalle-curso-profesor',
  templateUrl: './detalle-curso-profesor.component.html',
  styleUrl: './detalle-curso-profesor.component.css'
})
export class DetalleCursoProfesorComponent implements OnInit {
  
  loading: boolean = true;

  id!: number;
  codigo!: string;

  cursoProfesor_id: any
  cursoProfesor: any;
  cursosProfesor: any[] = [];

  user: any;

  estudiantes: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private userService: UserService,
    private cursoProfesorService : CursoProfesorService,
    private estudianteService: EstudianteService  
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

      this.cursoProfesorService.getCursoProfesorById(this.cursoProfesor_id).subscribe({
        next:(data)=>{
          this.cursoProfesor = data
          console.log('this.cursoProfesor',this.cursoProfesor)
          
          this.cursosProfesor.push(this.cursoProfesor)
          
          this.estudianteService.getEstudiantesByCursoId(this.cursoProfesor?.curso.id).subscribe({
            next: (estudiantes) =>{
              this.estudiantes = estudiantes.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
             
              this.loading = false
            }
          })
        }
      })

      //this.estudianteService.getEstudiantesByCursoId()
    });
  }
}
