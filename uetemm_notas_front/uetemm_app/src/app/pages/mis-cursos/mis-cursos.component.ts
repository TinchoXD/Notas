import { Component, OnInit } from '@angular/core';
import { CursoProfesorService } from '../../services/cursoProfesor/curso-profesor.service';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.css',
})
export class MisCursosComponent implements OnInit {
  errorMessage: String = '';
  cursosProfesor!: any[];

  user: any;

  constructor(
    private cursoProfesorService: CursoProfesorService,
    private loginService: LoginService,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
        this.cursoProfesorService
          .getAllCursoProfesorByProfesorId(this.user.id)
          .subscribe({
            next: (cursos) => {
              this.cursosProfesor = cursos;
              console.log(this.cursosProfesor);
              this.cursosProfesor.sort((a, b) => {
                const nivelComparison = a.curso.nivel.nombre.localeCompare(
                  b.curso.nivel.nombre
                );
                if (nivelComparison !== 0) return nivelComparison;

                const subnivelComparison =
                  a.curso.subnivel.nombre.localeCompare(
                    b.curso.subnivel.nombre
                  );
                if (subnivelComparison !== 0) return subnivelComparison;

                const gradoComparison = a.curso.grado.nombre.localeCompare(
                  b.curso.grado.nombre
                );
                if (gradoComparison !== 0) return gradoComparison;

                const paraleloComparison =
                  a.curso.paralelo.nombre.localeCompare(
                    b.curso.paralelo.nombre
                  );
                if (paraleloComparison !== 0) return paraleloComparison;

                return a.curso.jornada.nombre.localeCompare(
                  b.curso.jornada.nombre
                );
              });
              if (cursos.length === 0) {
                Swal.fire({
                  title: 'Advertencia!',
                  text: 'No cuenta con Cursos asignados a su usuario, Solicite asistencia a su administrador.',
                  icon: 'warning',
                  confirmButtonText: 'Ok',
                });
              }
            },
          });
      },
      error: (errorData) => {
        console.log('no se puede obtener la inforamcion del usuario loggeado.');
        this.errorMessage = errorData;
      },
    });
  }

  verCursoProfeso(estudianteRow: any) {
    console.log(estudianteRow);

    // Mostrar el spinner de carga
    this.loadingService.show();

    /* NAVEGACION POR PARÁMETROS HACIA UNA RUTA 
    setTimeout(() => {
      // Navegar a la ruta con los parámetros de consulta
      this.router.navigate(['/mis-cursos/curso'], {
        queryParams: { id: estudianteRow?.curso.id, codigo: estudianteRow?.curso.codigo, asignatura: estudianteRow?.asignatura.nombre }
      }).then(() => {
        this.loadingService.hide();
      });
    }, 550);  */

    this.loadingService.show();
    setTimeout(() => {
      this.router
        .navigate([`/mis-cursos/curso/${estudianteRow.id}`])
        .then(() => {
          this.loadingService.hide(); // Oculta el spinner de carga
        });
    }, 150); // Retraso de 2 segundos antes de la navegación
  }
}
