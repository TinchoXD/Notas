import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCursoProfesorComponent } from './dialogo-curso-profesor.component';

describe('DialogoCursoProfesorComponent', () => {
  let component: DialogoCursoProfesorComponent;
  let fixture: ComponentFixture<DialogoCursoProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoCursoProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoCursoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
