import { TestBed } from '@angular/core/testing';

import { ExportarNotasIndividualPdfService } from './exportar-notas-individual-pdf.service';

describe('ExportarNotasIndividualPdfService', () => {
  let service: ExportarNotasIndividualPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportarNotasIndividualPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
