import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/auth/login.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CursoService } from '../../../services/curso/curso.service';
import { CursoProfesorService } from '../../../services/cursoProfesor/curso-profesor.service';
import { NotaService } from '../../../services/nota/nota.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  userDataToken: any = null;

  user: any;
  data: any[] = [];  // Almacenar datos de cada gráfico
  options: any;

  cursosProfesor: any[] = [];

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private cursoService: CursoService,
    private cursoProfesorService: CursoProfesorService,
    private notaService: NotaService,
  ) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.subscription = this.loginService.userData.subscribe((token) => {
      if (token) {
        this.userDataToken = this.loginService.decodeToken(token);
        this.userService.getUserById(this.userDataToken?.userId).subscribe({
          next: (user) => {
            this.user = user;
            this.cursoProfesorService
              .getAllCursoProfesorByProfesorId(this.user.id)
              .subscribe({
                next: (cursoProfesor) => {
                  this.cursosProfesor = cursoProfesor;
                  this.loadAllData();  // Cargar los datos de todos los cursos
                },
              });
          },
        });
        this.loginService.verificarCambioDeContrasenia(this.userDataToken);
      }
    });
  }

  loadAllData() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.cursosProfesor.forEach((cursoProfesor, index) => {
      this.notaService.getNotasByCursoProfesor(cursoProfesor.id).subscribe({
        next: (notas) => {
          console.log('notas',notas)
          
          const maxCalificacionT1 = Math.max(...notas.map((d: { calificacionT1: any; }) => d.calificacionT1));
          const maxCalificacionT2 = Math.max(...notas.map((d: { calificacionT2: any; }) => d.calificacionT2));
          const maxCalificacionT3 = Math.max(...notas.map((d: { calificacionT3: any; }) => d.calificacionT3));

          const promedioCalificacionT1 = notas.reduce((sum: any, d: { calificacionT1: any; }) => sum + d.calificacionT1, 0) / notas.length;
          const promedioCalificacionT2 = notas.reduce((sum: any, d: { calificacionT2: any; }) => sum + d.calificacionT2, 0) / notas.length;
          const promedioCalificacionT3 = notas.reduce((sum: any, d: { calificacionT3: any; }) => sum + d.calificacionT3, 0) / notas.length;

          
          const minCalificacionT1 = Math.min(...notas.map((d: { calificacionT1: any; }) => d.calificacionT1));
          const minCalificacionT2 = Math.min(...notas.map((d: { calificacionT2: any; }) => d.calificacionT2));
          const minCalificacionT3 = Math.min(...notas.map((d: { calificacionT3: any; }) => d.calificacionT3));
          


          // Crear los datos para el gráfico con las notas recibidas
          this.data[index] = {
            labels: ['Trimestre I', 'Trimestre II', 'Trimestre III'],
            datasets: [
              {
                label: 'Calificación más Alta',
                data: [maxCalificacionT1,maxCalificacionT2,maxCalificacionT3],  // Aquí puedes reemplazar con los valores de `notas`
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                tension: 0.4,
              },
              {
                label: 'Promedio Calificaciones',
                data: [promedioCalificacionT1,promedioCalificacionT2,promedioCalificacionT3],  // Aquí puedes reemplazar con los valores de `notas`
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4,
              },
              {
                label: 'Calificación más Baja',
                data: [minCalificacionT1, minCalificacionT2, minCalificacionT3],  // Aquí puedes reemplazar con los valores de `notas`
                fill: false,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                tension: 0.4,
              },
            ],
          };
        }
      });
    });
  }

  navegarADetalle(cupr_id: number) {
    this.router.navigate(['/mis-cursos/curso', cupr_id]);
  }
}

