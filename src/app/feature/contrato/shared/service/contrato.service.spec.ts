import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { ContratoService } from './contrato.service';

describe('(8) - Test del Servicio "ContratoService"', () => {
  let service: ContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule        
      ],
      providers: [
        HttpService
        ]
    });
    service = TestBed.inject(ContratoService);
  });

  it('deberia ser creado', () => {
    expect(service).toBeTruthy();
  });
});
