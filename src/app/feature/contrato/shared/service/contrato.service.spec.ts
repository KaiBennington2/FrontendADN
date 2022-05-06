import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contrato } from '../model/contrato';
import { DetalleContrato } from '../model/detalleContrato';

import { ContratoService } from './contrato.service';

describe('(8) - Test del Servicio "ContratoService"', () => {
  let service: ContratoService;
  let httMock: HttpTestingController;
  let pathApiContratos: string = `${environment.endpoint}/contratos`;

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
    httMock = TestBed.inject(HttpTestingController);

  });

  it('deberia ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar los contratos', () => {
    let mockListaContratos: Contrato[] = [
      new Contrato(1, '123', 24, 'USD', 4000.36, 'PREMIUM', new Date('2022-06-06')),
      new Contrato(2, '456', 36, 'COP', 3000.10, 'COMPACT', new Date('2022-07-06')),
      new Contrato(3, '789', 48, 'USD', 3570.88, 'BASIC', new Date('2022-06-16'))
    ];

    service.consultar().subscribe(contratos => {
      expect(contratos.length).toBe(3);
      expect(contratos).toEqual(mockListaContratos)
    });

    const req = httMock.expectOne(pathApiContratos)
    expect(req.request.method).toBe('GET');
    req.flush(mockListaContratos);
  });

  it('deberia obtener contrato por Id', () => {
    let contrato = new Contrato(1, '123', 24, 'USD', 4000.36, 'PREMIUM', new Date('2022-06-06'));

    service.getContratoById(1).subscribe(r => {
      expect(r.data).toBe(contrato);
    });

    const req = httMock.expectOne(pathApiContratos + "/1")
    expect(req.request.method).toBe('GET');
  });


  it('deberia obtener detalle de contrato por Id', () => {
    let contratoTest = new Contrato(1, '12345678', 24, 'COP', 4000.12, 'COMPACT', new Date());
    let detalleContratoTest = new DetalleContrato(contratoTest, null, null, 1250000);

    service.getDetalleContratoById(1).subscribe(r => {
      expect(r.data).toBe(detalleContratoTest);
    });

    const req = httMock.expectOne(pathApiContratos + "/op?detail="+detalleContratoTest.id);
    expect(req.request.method).toBe('GET');
  });

  it('deberia de guardar el contrato', () => {
    let contratoTest = new Contrato(1, '12345678', 24, 'COP', 4000.12, 'COMPACT', new Date());

    let mockRsp = { valor: 12}
    service.guardar(contratoTest).subscribe(r => {
      expect(r.data).toBe(of(mockRsp));
      expect(req.request.method).toBe('POST');
    });
    const req = httMock.expectOne(pathApiContratos);

    expect(req.request.method).toBe('POST');
  });

  it('deberia de eliminar el contrato', () => {
    service.eliminar(123).subscribe();
    const req = httMock.expectOne(pathApiContratos+'/123');

    expect(req.request.method).toBe('DELETE');
  });

});
