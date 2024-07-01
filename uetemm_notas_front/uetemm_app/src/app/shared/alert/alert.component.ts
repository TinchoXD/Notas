import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() message?: string;
  @Input() type: 'success' | 'error' = 'success';
  visible = false;

  titulo: string = ''

  ngOnInit() {
    setTimeout(() => this.visible = true, 200); // Delay to trigger the fade-in animation
    this.titulo = this.type.toString()==="success"?"OK":"ERROR"
  }

  fadeOut() {
    this.visible = false;
  }
}
