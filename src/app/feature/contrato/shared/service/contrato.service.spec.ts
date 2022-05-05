import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { ContratoService } from './contrato.service';

describe('ContratoService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
