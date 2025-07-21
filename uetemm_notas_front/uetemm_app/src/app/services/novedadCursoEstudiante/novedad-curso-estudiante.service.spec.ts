import { TestBed } from '@angular/core/testing';

import { NovedadCursoEstudianteService } from './novedad-curso-estudiante.service';

describe('NovedadCursoEstudianteService', () => {
  let service: NovedadCursoEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovedadCursoEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
