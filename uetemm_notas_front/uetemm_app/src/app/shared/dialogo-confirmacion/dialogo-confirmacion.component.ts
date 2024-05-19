import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_MENU_CONTENT } from '@angular/material/menu';

export interface DialogData {
  titulo: string;
  mensaje: string;
}

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrl: './dialogo-confirmacion.component.css'
})
export class DialogoConfirmacionComponent implements OnInit{

  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit(): void {

  }

}
