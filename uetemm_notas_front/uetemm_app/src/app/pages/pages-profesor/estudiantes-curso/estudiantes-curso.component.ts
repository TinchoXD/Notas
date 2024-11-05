import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { AlertType } from '../../../shared/alert/alertType';
import { AlertService } from '../../../services/alert/alert.service';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-estudiantes-curso',
  templateUrl: './estudiantes-curso.component.html',
  styleUrl: './estudiantes-curso.component.css',
})
export class EstudiantesCursoComponent implements OnInit {
  estudiantes: any[] = [];
  loading: boolean = true;
  userDataToken!: any;
  onIcion: string = 'pi pi-check';

  ngOnInit(): void {
    this.loginService.userData.subscribe({
      next: (userDataToken) => {
        this.userDataToken = this.loginService.decodeToken(userDataToken);
      },
    });

    this.activatedRoute.params.subscribe((cursoId) => {
      this.estudianteService.getEstudiantesByCursoId(cursoId['id']).subscribe({
        next: (estudiantes) => {
          this.estudiantes = estudiantes;
          console.log(this.estudiantes);
          this.loading = false;
        },
      });
    });
  }

  constructor(
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService
  ) {}

  editarEstudiante(estudiante: any) {
    this.loadingService.show();
    setTimeout(() => {
      this.router
        .navigate([`/estudiantes/estudiante/${estudiante.id}`])
        .then(() => {
          this.loadingService.hide(); // Oculta el spinner de carga
        });
    }, 450); // Retraso de 2 segundos antes de la navegación
  }

  activarDesactivar(valor: any, estudiante: any) {
    estudiante.estado = valor.checked;
    estudiante.form_id = 9;

    const status = {
      id: estudiante.id,
      estado: valor.checked,
    };

    console.log('55555555', status);

    this.estudianteService.updateEstudentStatus(status).subscribe({
      next: () => {
        this.showAlert('Se actualizó el estado del usuario', 'success');
      },
    });
  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)) {
      this.alertService.showAlert(mensaje, type);
    }
  }
}
