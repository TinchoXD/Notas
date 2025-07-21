import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesCursoEstudianteComponent } from './novedades-curso-estudiante.component';

describe('NovedadesCursoEstudianteComponent', () => {
  let component: NovedadesCursoEstudianteComponent;
  let fixture: ComponentFixture<NovedadesCursoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovedadesCursoEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovedadesCursoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
