import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/user/user.service';
import { ThemePalette } from '@angular/material/core';
import { CursoProfesorService } from '../../../../services/cursoProfesor/curso-profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reasignar-curso-profesor',
  templateUrl: './reasignar-curso-profesor.component.html',
  styleUrl: './reasignar-curso-profesor.component.css',
})
export class ReasignarCursoProfesorComponent implements OnInit {
  cursoProfesor!: any;
  users: any[] = [];
  userSelected!: any;
  color: ThemePalette = 'primary';

  ngOnInit(): void {
    this.cursoProfesor = this.data;
    this.userSelected = {};
    this.userService.getAllUser().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReasignarCursoProfesorComponent>,
    private userService: UserService,
    private cursoProfesorService: CursoProfesorService
  ) {}

  onCancel() {
    this.dialogRef.close();
    this.userSelected = {};
  }

  reasignar() {
    if (this.userSelected?.id > 0) {

      Swal.fire({
        title: "¿Reasigar la asigntatura al nuevo profesor?",
        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Reasignar",
        //denyButtonText: `Cancelar`,
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.isConfirmed) {
          // establecer nuevo Docente
      this.cursoProfesor = {
        ...this.cursoProfesor,
        /*nuevo User ID*/ user_id: this.userSelected?.id,
      };

      this.cursoProfesorService
        .reasignarCursoProfesor(this.cursoProfesor)
        .subscribe({
          next: (res) => {
            if(res){
              Swal.fire("Materias reasignada!", "", "success");
              this.dialogRef.close();
              this.userSelected = {};
            }
          },
        });
         
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

      
    } else {
    }
  }
}
