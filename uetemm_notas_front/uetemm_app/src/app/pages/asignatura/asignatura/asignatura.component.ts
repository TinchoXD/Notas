import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../../services/asignatura/asignatura';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAsignaturaComponent } from '../dialogo-asignatura/dialogo-asignatura.component';
import { CatalogoService } from '../../../services/catalogo/catalogo.service';
import { Catalogo } from '../../../services/catalogo/catalogo';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrl: './asignatura.component.css'
})
export class AsignaturaComponent implements OnInit {

  asignaturaDialog: boolean = false;
  asignatura!: Catalogo;
  asignaturas!: Catalogo[];

  submitted: boolean = false;

  ngOnInit(): void {

  }

  constructor(
    public dialog: MatDialog,
    public catalogoService: CatalogoService
  ) {
    this.catalogoService.getAsignaturaActiveLista().subscribe({
      next: (data) => {
        this.asignaturas = data
      }
    })
  }

  dialogAgregarCurso() {
    this.asignaturaDialog = true;
    this.submitted = false;
    this.asignatura = {};


    const dialogRef = this.dialog.open(DialogoAsignaturaComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.catalogoService.getAsignaturaActiveLista()
          .subscribe((asignaturas) => (this.asignaturas = asignaturas));
      }
    });
  }

  editarAsignatura(asignaturaEdit: Catalogo) {
    this.asignatura = asignaturaEdit
    this.submitted = false;
    const dialogRef = this.dialog.open(DialogoAsignaturaComponent, {
      width: '600px',
      data: { asignaturaEdit },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.catalogoService.getAsignaturaActiveLista()
          .subscribe((asignaturas) => (this.asignaturas = asignaturas));
      }
    });
  }
}
