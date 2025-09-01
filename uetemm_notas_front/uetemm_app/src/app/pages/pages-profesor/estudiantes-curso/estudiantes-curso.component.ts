import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { AlertType } from '../../../shared/alert/alertType';
import { AlertService } from '../../../services/alert/alert.service';
import { ExportarNotasIndividualPdfService } from '../../../services/exportarNotasIndividualPdf/exportar-notas-individual-pdf.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NovedadesCursoEstudianteComponent } from '../novedades/novedades-curso/novedades-curso-estudiante/novedades-curso-estudiante.component';
import { Footer } from '../../../shared/footer-dialog/footer';
import { CursoService } from '../../../services/curso/curso.service';

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
  ref: DynamicDialogRef | undefined;
  curso: any;

  ngOnInit(): void {
    this.loginService.userData.subscribe({
      next: (userDataToken) => {
        this.userDataToken = this.loginService.decodeToken(userDataToken);
      },
    });

    this.activatedRoute.params.subscribe((cursoId) => {
      this.cursoService.getCursoById(cursoId['id']).subscribe({
        next: (curso) => {
          this.curso = curso
        },
      });
      this.estudianteService.getEstudiantesByCursoId(cursoId['id']).subscribe({
        next: (estudiantes) => {
          this.estudiantes = estudiantes;
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
    private alertService: AlertService,
    private exportarNotasIndividualPdfService: ExportarNotasIndividualPdfService,
    public dialogService: DialogService,
    public cursoService: CursoService
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

  generarReporteNotasIndividual(estudianteRow: any) {
    this.exportarNotasIndividualPdfService.exportarPDF(estudianteRow);
  }

  registrarNovedades(estudiante: any) {
    this.ref = this.dialogService.open(NovedadesCursoEstudianteComponent, {
      header: 'Novedades del Estudiante ' + estudiante.apellidosNombres,
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      data: {
        //cursoId: this.cursoId,
        estudiante,
        //cursoProfesor: this.cursoProfesor,
        curso: this.curso,
        tutor: this.userDataToken
        
      },
      closable: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      templates: {
        footer: Footer,
      },
    });
  }
}