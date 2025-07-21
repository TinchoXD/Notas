import { TestBed } from '@angular/core/testing';

import { CursoServiceShared } from './cursoShared.service';

describe('CursoService', () => {
  let service: CursoServiceShared;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoServiceShared);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
