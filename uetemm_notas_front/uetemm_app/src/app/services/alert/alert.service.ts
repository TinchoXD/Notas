import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AlertComponent } from '../../shared/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  showAlert(message: string, type: 'success' | 'error' = 'success') {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .global()
        .right('10px')
        .top('10px')
    });

    const alertPortal = new ComponentPortal(AlertComponent);
    const componentRef = this.overlayRef.attach(alertPortal);
    componentRef.instance.message = message;
    componentRef.instance.type = type;

    setTimeout(() => {
      componentRef.instance.fadeOut();
      setTimeout(() => this.overlayRef.dispose(), 500); // Wait for the fade-out animation to finish
    }, 2500); // Show alert for 3 seconds
  }
}
