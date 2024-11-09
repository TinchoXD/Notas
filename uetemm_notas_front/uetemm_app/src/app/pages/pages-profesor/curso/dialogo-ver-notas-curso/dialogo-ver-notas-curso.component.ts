import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursoProfesorService } from '../../../../services/cursoProfesor/curso-profesor.service';
import { CursoService } from '../../../../services/curso/curso.service';
import { LoadingService } from '../../../../services/loading/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogo-ver-notas-curso',
  templateUrl: './dialogo-ver-notas-curso.component.html',
  styleUrl: './dialogo-ver-notas-curso.component.css',
})
export class DialogoVerNotasCursoComponent implements OnInit {
  curso: any;
  cursosProfesor: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogoVerNotasCursoComponent>,
    private cursoService: CursoService,
    private cursoProfesorService: CursoProfesorService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.curso = this.data;

    this.cursoProfesorService.getCursoProfesorByCursoId(this.curso.curso.id).subscribe({
      next:(cursosProfesorData)=>{
        this.cursosProfesor = cursosProfesorData
      }
    })
  }

  verTodasLasNotas(curso: any)
  {
    this.loadingService.show();
    setTimeout(() => {
      this.router
        .navigate([`/notas-cursos/curso/${curso.curso.id}`])
        .then(() => {
          this.loadingService.hide(); // Oculta el spinner de carga
        });
    }, 150);
    this.dialogRef.close()
  }

  verNotasPorAsignatura(cursoProfesor: any)
  {

    
    this.loadingService.show();
    setTimeout(() => {
      this.router
        .navigate([`/mis-cursos/curso/${cursoProfesor.id}`])
        .then(() => {
          this.loadingService.hide(); // Oculta el spinner de carga
        });
    }, 150);
    this.dialogRef.close()
  }

  onCancel(){
    this.dialogRef.close()
  }

}
