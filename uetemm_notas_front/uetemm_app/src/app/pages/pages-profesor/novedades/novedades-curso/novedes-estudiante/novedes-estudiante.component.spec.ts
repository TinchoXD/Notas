import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedesEstudianteComponent } from './novedes-estudiante.component';

describe('NovedesEstudianteComponent', () => {
  let component: NovedesEstudianteComponent;
  let fixture: ComponentFixture<NovedesEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovedesEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovedesEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
