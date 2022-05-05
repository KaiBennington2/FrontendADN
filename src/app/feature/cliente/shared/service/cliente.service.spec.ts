import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { ClienteService } from './cliente.service';

describe('(4) - Test del Servicio "ClienteService"', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule        
      ],
      providers: [
        HttpService
        ]
    });
    service = TestBed.inject(ClienteService);
  });

  it('deberia ser creado', () => {
    expect(service).toBeTruthy();
  });
});
