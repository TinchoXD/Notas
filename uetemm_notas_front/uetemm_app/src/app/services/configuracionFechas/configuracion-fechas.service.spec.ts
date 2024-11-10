import { TestBed } from '@angular/core/testing';

import { ConfiguracionFechasService } from './configuracion-fechas.service';

describe('ConfiguracionFechasService', () => {
  let service: ConfiguracionFechasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionFechasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
