import { TestBed } from '@angular/core/testing';

import { CursoProfesorService } from './curso-profesor.service';

describe('CursoProfesorService', () => {
  let service: CursoProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
