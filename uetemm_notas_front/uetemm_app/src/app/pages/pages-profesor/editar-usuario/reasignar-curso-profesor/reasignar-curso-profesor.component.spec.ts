import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarCursoProfesorComponent } from './reasignar-curso-profesor.component';

describe('ReasignarCursoProfesorComponent', () => {
  let component: ReasignarCursoProfesorComponent;
  let fixture: ComponentFixture<ReasignarCursoProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReasignarCursoProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasignarCursoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
