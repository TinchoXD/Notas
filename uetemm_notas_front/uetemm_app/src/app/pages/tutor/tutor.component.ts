import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso/curso.service';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';
import { Curso } from '../../services/curso/curso';
import { LoadingService } from '../../services/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrl: './tutor.component.css',
})
export class TutorComponent implements OnInit {
  user: any;

  cursosTutor: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private loginService: LoginService,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.loginService.userToken).subscribe({
      next: (userData) => {
        this.user = userData;
        console.log('userData', this.user);
        this.cursoService.getCursoByUserId(this.user.id).subscribe({
          next: (cursosData) => {
            
            console.log('cursosData', cursosData);
            if(cursosData.length === 0){
              Swal.fire({
                title: 'Advertencia!',
                text: 'Su usuario no ha sido asignado como tutor de ningún curso.',
                icon: 'warning',
                confirmButtonText: 'Ok',
              });
            }
            this.cursosTutor = cursosData;
            console.log('cursosTutor', this.cursosTutor);
          },
        });
      },
    });
  }

  verCursoTutor(cursoTutor: any) {
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
        .navigate([`/notas-cursos/curso/${cursoTutor.id}`])
        .then(() => {
          this.loadingService.hide(); // Oculta el spinner de carga
        });
    }, 150); // Retraso de 2 segundos antes de la navegación
  }
}
