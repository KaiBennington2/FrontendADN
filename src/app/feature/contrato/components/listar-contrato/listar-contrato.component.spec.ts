import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Contrato } from '@feature/contrato/shared/model/contrato';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { FiltroTablaClass } from './contrato-filtro-pipe-class';

import { ListarContratoComponent } from './listar-contrato.component';

describe('(6) - Test del componente "ListarContratoComponent"', () => {
  let component: ListarContratoComponent;
  let fixture: ComponentFixture<ListarContratoComponent>;
  let contratoService: ContratoService;

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
    spyOn(contratoService, 'consultar').and.returnValue(of(mockListaContratos));
    fixture.detectChanges();
  });

  it('debera crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia listar los contratos', () => {
    expect(mockListaContratos).toBe(component.listaContratos);
  });

  it('deberia calcular el total de los contratos', () => {
    expect(3).toBe(component.totalContratos);
  });
});
