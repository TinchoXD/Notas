import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAsignaturaComponent } from './dialogo-asignatura.component';

describe('DialogoAsignaturaComponent', () => {
  let component: DialogoAsignaturaComponent;
  let fixture: ComponentFixture<DialogoAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoAsignaturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
