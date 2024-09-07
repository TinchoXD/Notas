import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../../services/curso/curso';
import { AgregarCursoComponent } from '../dialogo-curso/agregar-curso.component';
import { MatDialog } from '@angular/material/dialog';
import { CursoService } from '../../../../services/curso/curso.service';
import { DialogoConfirmacionComponent } from '../../../../shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from '../../../../services/auth/login.service';

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
  userData: any = null;


  ngOnInit(): void {
    this.loginService.userData.subscribe((token) => {
      if (token) {
        // Decodifica el token para obtener la información del usuario
        this.userData = this.loginService.decodeToken(token);
        this.loginService.verificarCambioDeContrasenia(this.userData)

      }
    });

    
    this.cursoService.getCursosActivos().subscribe({
      next: (data) => {
        this.cursos = data
      }
    })
  }

  constructor(
    public dialog: MatDialog,
    private cursoService: CursoService,
    private loginService: LoginService
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
        titulo: `¿Eliminar Curso?`,
         mensaje: ' asdawd afwfaw'
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
