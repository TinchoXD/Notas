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

  ngOnInit() {
    setTimeout(() => this.visible = true, 100); // Delay to trigger the fade-in animation
  }

  fadeOut() {
    this.visible = false;
  }
}
