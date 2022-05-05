import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Cliente } from '@feature/cliente/shared/model/cliente';
import { ClienteService } from '@feature/cliente/shared/service/cliente.service';
import { Contrato } from '@feature/contrato/shared/model/contrato';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';

import { CrearContratoComponent } from './crear-contrato.component';

describe('(7) - Test del componente "CrearContratoComponent"', () => {
  let component: CrearContratoComponent;
  let fixture: ComponentFixture<CrearContratoComponent>;
  let clienteService: ClienteService;
  let contratoService: ContratoService;
  let contratoTest: Contrato;
  let mockRsp: { error: boolean, msg: string, data: any };

  let mockListaClientes: Cliente[] = [
    new Cliente( 1, "12345678", "Pruebas S.A.S.", "Kai Bennington", "3013101550", "Cll 000 # 01 - 04"),
    new Cliente( 2, "0987654", "Tests S.A.S.", "Alonso Bennington", "3023111660", "Cll 111 # 03 - 04"),
    new Cliente( 3, "1029384", "Empresa S.A.S.", "Cliente Prueba", "3023013065", "Cll 222 # 13 - 24"),
    new Cliente( 4, "1234567", "UnaMas S.A.S.", "Yo uno", "1234567890", "Cll 222 # 21 - 34")
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CrearContratoComponent 
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        ClienteService,
        ContratoService,
        HttpService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearContratoComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    contratoService = TestBed.inject(ContratoService);
    spyOn(clienteService, 'consultar').and.returnValue(of(mockListaClientes));
    contratoTest = new Contrato( 1, "12345678", 24, 'USD', 4000.12, 'BASIC', new Date());
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario deberia ser invalido por falta de campo Obligatorio', () => {
    expect(component.contratoForm.valid).toBeFalsy();
  });

  it('formulario deberia ser valido', () => {
    expect(component.contratoForm.valid).toBeFalsy();
    component.contratoForm.controls['id'].setValue(contratoTest.id);
    component.contratoForm.controls['nitCliente'].setValue(contratoTest.nitCliente);
    component.contratoForm.controls['tiempoContratoMeses'].setValue(contratoTest.tiempoContratoMeses);
    component.contratoForm.controls['tipoMoneda'].setValue(contratoTest.tipoMoneda);
    component.contratoForm.controls['trmAplicada'].setValue(contratoTest.trmAplicada);
    component.contratoForm.controls['paquete'].setValue(contratoTest.paquete);
    component.contratoForm.controls['fechaInstalacion'].setValue(contratoTest.fechaInstalacion);

    expect(component.contratoForm.valid).toBeTrue();
  });

  it('deberia guardar un contrato', () => {
    mockRsp = {error:false, msg: '', data: null};
    spyOn(contratoService, 'guardar').and.returnValue(of(mockRsp));
    
    component.contratoForm.controls['id'].setValue(contratoTest.id);
    component.contratoForm.controls['nitCliente'].setValue(contratoTest.nitCliente);
    component.contratoForm.controls['tiempoContratoMeses'].setValue(contratoTest.tiempoContratoMeses);
    component.contratoForm.controls['tipoMoneda'].setValue(contratoTest.tipoMoneda);
    component.contratoForm.controls['trmAplicada'].setValue(contratoTest.trmAplicada);
    component.contratoForm.controls['paquete'].setValue(contratoTest.paquete);
    component.contratoForm.controls['fechaInstalacion'].setValue(contratoTest.fechaInstalacion);

    component.guardar();
    expect(component.rspService.msg).toEqual(mockRsp.msg);    
  });

  it('deberia sacar error por nit vacio al tratar de guardar un contrato', () => {
    component.contratoForm.controls['id'].setValue(contratoTest.id);
    component.contratoForm.controls['nitCliente'].setValue(null);
    component.contratoForm.controls['tiempoContratoMeses'].setValue(contratoTest.tiempoContratoMeses);
    component.contratoForm.controls['tipoMoneda'].setValue(contratoTest.tipoMoneda);
    component.contratoForm.controls['trmAplicada'].setValue(contratoTest.trmAplicada);
    component.contratoForm.controls['paquete'].setValue(contratoTest.paquete);
    component.contratoForm.controls['fechaInstalacion'].setValue(contratoTest.fechaInstalacion);

    expect(component.contratoForm.invalid).toBeTrue();
    
    console.log(component.rspService)
    const mockRsp = {
      error:false,
      msg: "El NIT es un requisito obligatorio.",
      data: {
        nombreExcepcion: "ExcepcionValorObligatorio",
        mensaje: "El NIT es un requisito obligatorio."
      }
    }

    spyOn(contratoService, 'guardar').and.returnValue(of(mockRsp));

    component.guardar();
    console.log(component.rspService)
    expect("El NIT es un requisito obligatorio.").toEqual(component.rspService.msg)
  });

});
