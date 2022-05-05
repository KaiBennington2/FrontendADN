import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Cliente } from '@feature/cliente/shared/model/cliente';
import { ClienteService } from '@feature/cliente/shared/service/cliente.service';
import { Contrato } from '@feature/contrato/shared/model/contrato';
import { DetalleContrato } from '@feature/contrato/shared/model/detalleContrato';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';

import { DetalleContratoComponent } from './detalle-contrato.component';

describe('DetalleContratoComponent', () => {
  let component: DetalleContratoComponent;
  let fixture: ComponentFixture<DetalleContratoComponent>;
  let clienteService: ClienteService;
  let mockRsp: { error: boolean, msg: string, data: Cliente };
  let mockRspDetalleContrato: { error: boolean, msg: string, data: DetalleContrato };
  let detalleContratoTest: DetalleContrato;
  let clienteTest: Cliente;
  let contratoTest: Contrato;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
       DetalleContratoComponent
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [
        ClienteService,
        HttpService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleContratoComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    clienteTest = new Cliente( 1, "12345678", "Pruebas S.A.S.", "Kai Bennington", "3013101550", "Cll 000 # 01 - 04");
    contratoTest = new Contrato( 1, clienteTest.nitCliente,24,'COP', 4000.12, 'COMPACT', new Date());
    detalleContratoTest = new DetalleContrato(contratoTest, null, null, 1250000);
    fixture.detectChanges();
  });

  it('deberia crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia mostrar los detalles de contrato', () => {
    mockRspDetalleContrato = { error: false, msg: '', data: detalleContratoTest }
    mockRsp = { error: false, msg: '', data: clienteTest }

    spyOn(clienteService, 'obtenerPorNit').and.returnValue(of(mockRsp));
    component.detalleContrato = detalleContratoTest;
    
    component.ngOnInit();

    expect(component.rspService).toEqual(mockRsp);

    expect(component.detalleContrato.nitCliente).toEqual(mockRspDetalleContrato.data.nitCliente);
    expect(component.cliente).toBe(mockRsp.data);

  });
});
