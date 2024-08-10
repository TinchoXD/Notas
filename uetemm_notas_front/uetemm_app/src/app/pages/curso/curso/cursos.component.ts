import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../services/curso/curso';
import { AgregarCursoComponent } from '../dialogo-curso/agregar-curso.component';
import { MatDialog } from '@angular/material/dialog';
import { CursoService } from '../../../services/curso/curso.service';
import { DialogoConfirmacionComponent } from '../../../shared/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit {

  submitted: boolean = false;

  agregarCursoDialog: boolean = false;
  curso!: Curso;
  cursos!: Curso[];


  ngOnInit(): void {
    this.cursoService.getCursosActivos().subscribe({

      next: (data) => {
        this.cursos = data
      }

    })
  }

  constructor(
    public dialog: MatDialog,
    private cursoService: CursoService,
  ) {

  }

  dialogAgregarCurso() {
    this.agregarCursoDialog = true;
    this.submitted = false;
    this.curso = {};


    const dialogRef = this.dialog.open(AgregarCursoComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cursoService
          .getCursosActivos()
          .subscribe((cursos) => (this.cursos = cursos));
      }
    });
  }

  editarCurso(cursoEdit: Curso) {
    this.curso = cursoEdit;
    //const userId = this.userId;
    this.submitted = false;

    const dialogRef = this.dialog.open(AgregarCursoComponent, {
      width: '600px',
      data: { cursoEdit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cursoService
          .getCursosActivos()
          .subscribe((cursos) => (this.cursos = cursos));
      }
    });
  }

  eliminarCurso(curso: Curso){
    console.log('curso a borrar', curso)
    this.dialog.open(DialogoConfirmacionComponent,{
      data:{
        titutlo: `¿Eliminar Curso?`,
         mensaje: 'Desea eliminar el Curso ' + curso.grado +' '+ curso.paralelo + ' de la jornada '+ curso.jornada
      }
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        const delCurso = {id: curso.id}
        this.cursoService.delCurso(delCurso).subscribe({next: ()=>{
          delete this.cursos[this.cursos.findIndex(curso => curso.id == delCurso.id)]
        }});
      } else {
        this.dialog.closeAll();
      } 
    });
  }

  hideDialog() {
    this.agregarCursoDialog = false;
    this.submitted = false;
  }
  agregarCurso() {
    this.submitted = true;
  }

}
