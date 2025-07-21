import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActualizarNovedadComponent } from './crear-actualizar-novedad.component';

describe('CrearActualizarNovedadComponent', () => {
  let component: CrearActualizarNovedadComponent;
  let fixture: ComponentFixture<CrearActualizarNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearActualizarNovedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearActualizarNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
