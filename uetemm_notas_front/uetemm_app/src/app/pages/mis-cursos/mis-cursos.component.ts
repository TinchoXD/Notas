import { Component, OnInit } from '@angular/core';
import { CursoProfesorService } from '../../services/cursoProfesor/curso-profesor.service';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.css'
})
export class MisCursosComponent implements OnInit {

  errorMessage: String = '';
  cursosProfesor!: any[]

  user: any;

  constructor(
    private cursoProfesorService: CursoProfesorService,
    private loginService: LoginService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
 

    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
        this.cursoProfesorService.getAllCursoProfesorByProfesorId(this.user.id).subscribe({
          next: (cursos) => {
            this.cursosProfesor = cursos;
            console.log(this.cursosProfesor)
            this.cursosProfesor.sort((a, b) => {
              const nivelComparison = a.curso.nivel.nombre.localeCompare(b.curso.nivel.nombre);
              if (nivelComparison !== 0) return nivelComparison;
    
              const subnivelComparison = a.curso.subnivel.nombre.localeCompare(b.curso.subnivel.nombre);
              if (subnivelComparison !== 0) return subnivelComparison;
    
              const gradoComparison = a.curso.grado.nombre.localeCompare(b.curso.grado.nombre);
              if (gradoComparison !== 0) return gradoComparison;
    
              const paraleloComparison = a.curso.paralelo.nombre.localeCompare(b.curso.paralelo.nombre);
              if (paraleloComparison !== 0) return paraleloComparison;
    
              return a.curso.jornada.nombre.localeCompare(b.curso.jornada.nombre);
            });
          }
        })
      },
      error: (errorData) => {
        console.log("no se puede obtener la inforamcion del usuario loggeado.")
        this.errorMessage = errorData;
      },
    });



  }


}
