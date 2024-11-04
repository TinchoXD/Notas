import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesCursoComponent } from './estudiantes-curso.component';

describe('EstudiantesCursoComponent', () => {
  let component: EstudiantesCursoComponent;
  let fixture: ComponentFixture<EstudiantesCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudiantesCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
