import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Contrato } from '@feature/contrato/shared/model/contrato';
import { DetalleContrato } from '@feature/contrato/shared/model/detalleContrato';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { FiltroTablaClass } from './contrato-filtro-pipe-class';

import { ListarContratoComponent } from './listar-contrato.component';

describe('(6) - Test del componente "ListarContratoComponent"', () => {
  let component: ListarContratoComponent;
  let fixture: ComponentFixture<ListarContratoComponent>;
  let contratoService: ContratoService;
  let mockRsp: { error: boolean, msg: string, data: any };
  let ELIMINADO = 'El contrato fue eliminado con exito.';
  let contratoTest: Contrato;
  let detalleContratoTest: DetalleContrato;

  let mockListaContratos: Contrato[] = [
    new Contrato(1,'123',24,'USD',4000.36,'PREMIUM',new Date('2022-06-06')),
    new Contrato(2,'456',36,'COP',3000.10,'COMPACT',new Date('2022-07-06')),
    new Contrato(3,'789',48,'USD',3570.88,'BASIC',new Date('2022-06-16'))
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ListarContratoComponent,
        FiltroTablaClass
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ContratoService,
        HttpService,NgbModalConfig,NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContratoComponent);
    component = fixture.componentInstance;
    contratoService = TestBed.inject(ContratoService);
    
    fixture.detectChanges();
  });

  it('debera crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia llenar la lista de los contratos', () => {
    spyOn(contratoService, 'consultar').and.returnValue(of(mockListaContratos));

    component.ngOnInit();

    expect(component.listaContratos).toBe(mockListaContratos);
  });

  it('deberia calcular el total de los contratos', () => {
    spyOn(contratoService, 'consultar').and.returnValue(of(mockListaContratos));

    component.ngOnInit();

    expect(component.totalContratos).toEqual(3);
  });

  it('deberia eliminar un contrato de la lista', () => {
    mockRsp = { error: false, msg: '', data: null}
    spyOn(contratoService, 'eliminar').and.returnValue(of(mockRsp));
    spyOn(window, 'alert');

    component.eliminarContrato(1);

    expect(window.alert).toHaveBeenCalledWith(ELIMINADO);
  });

  it('deberia sacar error al tratar de eliminar un contrato no existente', () => {
    mockRsp = { error: true, msg: 'el contrato no existe en el sistema.',
                data: { nombreExcepcion: 'ExcepcionSinDatos', mensaje: 'el contrato no existe en el sistema.' }
              }
    spyOn(contratoService, 'eliminar').and.returnValue(of(mockRsp));
    spyOn(window, 'alert');

    component.eliminarContrato(1);

    expect(window.alert).toHaveBeenCalledWith(mockRsp.data.mensaje);
  });

  it('deberia sacar error por contrato no existente', () => {
    contratoTest = new Contrato(1, '12345678', 24, 'COP', 4000.12, 'COMPACT', new Date());
    detalleContratoTest = new DetalleContrato(contratoTest, null, null, 1250000);

    mockRsp = { error: true, msg: 'el contrato no existe en el sistema.',
                data: { nombreExcepcion: 'ExcepcionSinDatos', mensaje: 'el contrato no existe en el sistema.' }
              }

    spyOn(contratoService, 'getDetalleContratoById').and.returnValue(of(mockRsp));
    spyOn(window, 'alert');

    component.getDetalleContrato(1,'');

    expect(window.alert).toHaveBeenCalledWith(mockRsp.data.mensaje);
  });

  it('deberia mostrar el detalle del contrato con id del mismo', () => {
    contratoTest = new Contrato(1, '12345678', 24, 'COP', 4000.12, 'COMPACT', new Date());
    detalleContratoTest = new DetalleContrato(contratoTest, null, null, 1250000);

    mockRsp = { error: false, msg: '', data: detalleContratoTest }
    spyOn(contratoService, 'getDetalleContratoById').and.returnValue(of(mockRsp));

    component.getDetalleContrato(1,'');

    expect(component.detalleContrato).toEqual(mockRsp.data);
  });
  
});
