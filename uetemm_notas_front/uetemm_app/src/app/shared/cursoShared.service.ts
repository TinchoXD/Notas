import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CursoServiceShared {
  private cursoId!: number;

  setCursoId(id: number) {
    this.cursoId = id;
  }

  getCursoId(): number {
    return this.cursoId;
  }
}