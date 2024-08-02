import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.css'
})
export class AgregarCursoComponent {

  color: ThemePalette = 'primary';

  constructor(private dialogRef: MatDialogRef<AgregarCursoComponent>,){

  }

  onCancel(){
    this.dialogRef.close();
  }
}
