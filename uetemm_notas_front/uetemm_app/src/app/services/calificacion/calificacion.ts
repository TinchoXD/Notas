import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  convertirCualitativo(nota: number): string {
    if (nota >= 9.5) {
      return 'A+';
    } else if (nota >= 8.5) {
      return 'A-';
    } else if (nota >= 7.5) {
      return 'B+';
    } else if (nota >= 6.5) {
      return 'B-';
    } else if (nota >= 5.5) {
      return 'C+';
    } else if (nota >= 4.5) {
      return 'C-';
    } else if (nota >= 3.5) {
      return 'D+';
    } else if (nota >= 2.5) {
      return 'D-';
    } else if (nota >= 1.5) {
      return 'E+';
    } else if (nota > 0) {
      return 'E-';
    }
    return '-';
  }

  getNotaColorBackground(nota: number): string {
    if (nota >= 9) {
      return '#d4edda'; // Success - verde claro
    } else if (nota >= 7) {
      return '#fff3cd'; // Info - amarillo claro
    } else if (nota >= 5) {
      return '#ffeeba'; // Warning - amarillo oscuro
    } else if (nota > 0) {
      return '#f8d7da'; // Danger - rojo claro
    } else {
      return '#e9ecef'; // Secondary - gris claro
    }
  }

  getNotaColorText(nota: number): string {
    if (nota >= 9) {
      return '#155724'; // Success - verde oscuro
    } else if (nota >= 7) {
      return '#856404'; // Info - amarillo oscuro
    } else if (nota >= 5) {
      return '#6c757d'; // Warning - gris oscuro
    } else if (nota > 0) {
      return '#721c24'; // Danger - rojo oscuro
    } else {
      return '#6c757d'; // Secondary - gris oscuro
    }
  }

  redondear(nota: number): number {
    if (nota) {
      return Math.round(nota);
    }
    return 0;
  }

  redondearNotaFinal(t1: number, t2: number, t3: number): number {
    if (t1 || t2 || t3) {
      return Math.round((t1 + t2 + t3) / 3);
    }
    return 0;
  }
}
