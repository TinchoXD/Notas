import { Component, Inject, OnInit } from '@angular/core';
import { AlertType } from '../../../../shared/alert/alertType';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogoService } from '../../../../services/catalogo/catalogo.service';
import { AlertService } from '../../../../services/alert/alert.service';
import { CatalogoRequest } from '../../../../services/catalogo/catalogoRequest';

function isAlertType(type: string): type is AlertType {
  return type === 'success' || type === 'error';
}

@Component({
  selector: 'app-dialogo-asignatura',
  templateUrl: './dialogo-asignatura.component.html',
  styleUrl: './dialogo-asignatura.component.css'
})
export class DialogoAsignaturaComponent implements OnInit {

  color: ThemePalette = 'primary';
  asignaturaForm: FormGroup;
  errorMessage: String = 'Este campo es obligatorio.';

  ngOnInit(): void {
    if (this.data.asignaturaEdit) {
      this.asignaturaForm.patchValue({
        id: this.data.asignaturaEdit.id.toString(),
        nombre: this.data.asignaturaEdit.nombre,
      });
    } 
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogoAsignaturaComponent>,
    private fb: FormBuilder,
    private catalogoService: CatalogoService,
    private alertService: AlertService,
  ) {
    this.asignaturaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
  }

  onSubmit(){
    console.log('this.asignaturaForm', this.asignaturaForm)
    if (this.asignaturaForm.valid) {
      this.catalogoService.putAsignatura(this.asignaturaForm.value as CatalogoRequest);
      this.dialogRef.close(this.asignaturaForm.value);
    } else {
      this.showAlert(
        'Error al agregar un nuevo curso, valide los datos del formulario',
        'error'
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  showAlert(mensaje: string, type: string) {
    if (isAlertType(type)) {
      this.alertService.showAlert(mensaje, type);
    }
  }

  get nombre() {
    return this.asignaturaForm.controls['nombre'];
  }

}
