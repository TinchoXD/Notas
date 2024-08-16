import { Component, OnInit } from '@angular/core';
import { AlertType } from '../../shared/alert/alertType';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { ThemePalette } from '@angular/material/core';
import { PrimeNGConfig } from 'primeng/api';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit {

  submitted: boolean = false;
  color: ThemePalette = 'primary';
  loading: boolean = true;

  estudiante!: any;
  estudiantes!: any[];

  
  cursos!: any[];

  selectedCursos: any[] = []; // O el tipo específico que corresponda



  constructor(
    private primengConfig: PrimeNGConfig,
    private estudianteService: EstudianteService) {

  }

  ngOnInit(): void {

    this.primengConfig.setTranslation({
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual a',
      notEquals: 'Diferente de',
      noFilter: 'Borrar filtro'
  });

    this.estudianteService.getAllEstudiantes().subscribe({
      next: (estudiantes) => {
        this.estudiantes = estudiantes
        this.loading = false;
        console.log('estudiantes', estudiantes)

        this.cursos = estudiantes
        .map(estudiante => estudiante.curso)
        .filter((curso, index, self) =>
          index === self.findIndex(c => c.id === curso.id)
        );
  
      console.log('Cursos distintos:', this.cursos);
      }
    })

  }




}
