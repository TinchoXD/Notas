import { Component, OnInit } from '@angular/core';
import { AlertType } from '../../../shared/alert/alertType';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { ThemePalette } from '@angular/material/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../../../services/loading/loading.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';
import { LoginService } from '../../../services/auth/login.service';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css',
})
export class EstudianteComponent implements OnInit {
  submitted: boolean = false;
  color: ThemePalette = 'primary';
  loading: boolean = true;

  estudiante!: any;
  estudiantes!: any[];
  checked: boolean = true;
  val: number = 3;
  onIcion: string = 'pi pi-check';

  cursos!: any[];
  userData: any = null;

  selectedCursos: any[] = []; // O el tipo específico que corresponda

  constructor(
    private primengConfig: PrimeNGConfig,
    private estudianteService: EstudianteService,
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService,
    //private messageServicePNG: MessageService,
    private messageService: MessageService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {

    this.loginService.userData.subscribe((token) => {
      if (token) {
        // Decodifica el token para obtener la información del usuario
        this.userData = this.loginService.decodeToken(token);
        this.loginService.verificarCambioDeContrasenia(this.userData)

      }
    });
    

    this.primengConfig.setTranslation({
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual a',
      notEquals: 'Diferente de',
      noFilter: 'Borrar filtro',
    });

    this.estudianteService.getAllEstudiantes().subscribe({
      next: (estudiantes) => {
        this.loading = false;
        this.estudiantes = estudiantes.sort((a, b) =>
          a.apellidosNombres.localeCompare(b.apellidosNombres)
        );
        console.log('estudiantes', estudiantes);

        // Crear lista para filtro de Cursos (sin repetir)
        this.cursos = estudiantes
          .map((estudiante) => estudiante.curso)
          .filter(
            (curso, index, self) =>
              index === self.findIndex((c) => c?.id === curso?.id)
          );

        console.log('Cursos distintos:', this.cursos);
      },
    });
  }

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
