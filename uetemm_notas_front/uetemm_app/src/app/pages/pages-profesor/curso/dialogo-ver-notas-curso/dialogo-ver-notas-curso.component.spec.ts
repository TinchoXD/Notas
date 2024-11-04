import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoVerNotasCursoComponent } from './dialogo-ver-notas-curso.component';

describe('DialogoVerNotasCursoComponent', () => {
  let component: DialogoVerNotasCursoComponent;
  let fixture: ComponentFixture<DialogoVerNotasCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoVerNotasCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoVerNotasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
