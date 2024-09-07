import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCursoTutorComponent } from './detalle-curso-tutor.component';

describe('DetalleCursoTutorComponent', () => {
  let component: DetalleCursoTutorComponent;
  let fixture: ComponentFixture<DetalleCursoTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleCursoTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleCursoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
