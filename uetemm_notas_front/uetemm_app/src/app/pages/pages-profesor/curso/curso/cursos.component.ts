import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../../services/curso/curso';
import { AgregarCursoComponent } from '../dialogo-curso/agregar-curso.component';
import { MatDialog } from '@angular/material/dialog';
import { CursoService } from '../../../../services/curso/curso.service';
import { DialogoConfirmacionComponent } from '../../../../shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from '../../../../services/auth/login.service';
import { PrimeNGConfig } from 'primeng/api';
import Swal from 'sweetalert2';
import { DialogoVerNotasCursoComponent } from '../dialogo-ver-notas-curso/dialogo-ver-notas-curso.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
  
})
export class CursosComponent implements OnInit {
  submitted: boolean = false;

  agregarCursoDialog: boolean = false;
  curso!: Curso;
  cursos!: any[];
  userData: any = null;
  userDataToken!: any;

  nivelFiltro!: any[];
  subnivelFiltro!: any[];
  gradoFiltro!: any[];
  paraleloFiltro!: any[];
  jornadaFiltro!: any[];
  tutorFiltro!: any[];

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Rechazar',
      choose: 'Seleccionar',
      upload: 'Subir',
      cancel: 'Cancelar',
      clear: 'Limpiar',
      apply: 'Aplicar',
      matchAny: ' cua'
      // Añade más traducciones aquí según tus necesidades
    });

    this.loginService.userData.subscribe({
      next: (userDataToken) => {
        this.userDataToken = this.loginService.decodeToken(userDataToken);
      },
    });

    this.loginService.userData.subscribe((token) => {
      if (token) {
        // Decodifica el token para obtener la información del usuario
        this.userData = this.loginService.decodeToken(token);
        this.loginService.verificarCambioDeContrasenia(this.userData);
      }
    });

    this.cursoService.getCursosActivos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;

        //* LISTA PARA FILTRO POR NIVEL
        this.nivelFiltro = Array.from(
          new Set(cursos.map((curso: any) => curso.nivel))
        );
        // Crear una nueva lista con objetos no repetidos basados en el campo `id`
        this.nivelFiltro = this.nivelFiltro.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.id === item.id && t.nombre === item.nombre)
        );
        //* LISTA PARA FILTRO POR SUBNIVEL
        this.subnivelFiltro = Array.from(
          new Set(cursos.map((curso: any) => curso.subnivel))
        );
        // Crear una nueva lista con objetos no repetidos basados en el campo `id`
        this.subnivelFiltro = this.subnivelFiltro.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.id === item.id && t.nombre === item.nombre)
        );
        //* LISTA PARA FILTRO POR GRADO
        this.gradoFiltro = Array.from(
          new Set(cursos.map((curso: any) => curso.grado))
        );
        // Crear una nueva lista con objetos no repetidos basados en el campo `id`
        this.gradoFiltro = this.gradoFiltro.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.id === item.id && t.nombre === item.nombre)
        );
        //* LISTA PARA FILTRO POR PARALELO
        this.paraleloFiltro = Array.from(
          new Set(cursos.map((curso: any) => curso.paralelo))
        );
        // Crear una nueva lista con objetos no repetidos basados en el campo `id`
        this.paraleloFiltro = this.paraleloFiltro.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.id === item.id && t.nombre === item.nombre)
        );
        //* LISTA PARA FILTRO POR JORNADA
        this.jornadaFiltro = Array.from(
          new Set(cursos.map((curso: any) => curso.jornada))
        );
        // Crear una nueva lista con objetos no repetidos basados en el campo `id`
        this.jornadaFiltro = this.jornadaFiltro.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.id === item.id && t.nombre === item.nombre)
        );
      },
      
    });
  }

  constructor(
    public dialog: MatDialog,
    private cursoService: CursoService,
    private loginService: LoginService,
    private primengConfig: PrimeNGConfig
  ) {}

  dialogAgregarCurso() {
    this.agregarCursoDialog = true;
    this.submitted = false;
    this.curso = {};

    const dialogRef = this.dialog.open(AgregarCursoComponent, {
      width: '600px',
      data: {},
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

  eliminarCurso(curso: Curso) {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: {
          titulo: `¿Eliminar Curso?`,
          mensaje: ' asdawd afwfaw',
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          const delCurso = { id: curso.id };
          this.cursoService.delCurso(delCurso).subscribe({
            next: () => {
              delete this.cursos[
                this.cursos.findIndex((curso) => curso.id == delCurso.id)
              ];
            },
          });
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

  verNotas(curso: any){
    
    this.dialog.open(DialogoVerNotasCursoComponent,
      {
        width: '700px',
        data: {
          curso: curso
        }
      }
    )

  }
}
