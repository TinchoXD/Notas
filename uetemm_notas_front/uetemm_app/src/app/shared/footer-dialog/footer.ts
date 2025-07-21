import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="flex w-full justify-end mt-4">
      <p-button
        type="button"
        label="Cerrar"
        icon="pi pi-times"
        (click)="
          closeDialog({ buttonType: 'Cancel', summary: 'Dialogo Cerrardo' })
        "
      />
    </div>
  `,
})
export class Footer {
  constructor(public ref: DynamicDialogRef) {}

  closeDialog(data: any) {
    this.ref.close(data);
  }
}
