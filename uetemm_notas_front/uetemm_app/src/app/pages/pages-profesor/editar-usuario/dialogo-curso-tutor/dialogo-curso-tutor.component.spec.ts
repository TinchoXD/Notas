import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCursoTutorComponent } from './dialogo-curso-tutor.component';

describe('DialogoCursoTutorComponent', () => {
  let component: DialogoCursoTutorComponent;
  let fixture: ComponentFixture<DialogoCursoTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoCursoTutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoCursoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
