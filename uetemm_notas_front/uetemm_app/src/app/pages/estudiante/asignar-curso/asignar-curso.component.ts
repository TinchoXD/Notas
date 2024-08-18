import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../services/curso/curso';
import { CursoService } from '../../../services/curso/curso.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asignar-curso',
  templateUrl: './asignar-curso.component.html',
  styleUrl: './asignar-curso.component.css'
})
export class AsignarCursoComponent implements OnInit{

  cursoSeleccionado!: Curso;
  cursos!: Curso[];

  constructor(
    public dialogRef: MatDialogRef<AsignarCursoComponent>,
    private cursoService: CursoService,
  ) {

  }

  ngOnInit(): void {
    this.cursoService.getCursosActivos().subscribe({
      next: (data) => {
        this.cursos = data
      }
    })
  }

  seleccionarCurso(curso: Curso){
    this.dialogRef.close(curso)
  }

}
