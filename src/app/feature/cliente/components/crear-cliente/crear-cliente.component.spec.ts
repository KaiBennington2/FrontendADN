import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '@core/services/http.service';
import { ClienteService } from '@cliente/shared/service/cliente.service';

import { CrearClienteComponent } from './crear-cliente.component';
import { Cliente } from '@feature/cliente/shared/model/cliente';
import { of } from 'rxjs';

describe('(3) - Test del componente "CrearClienteComponent"', () => {
  let component: CrearClienteComponent;
  let fixture: ComponentFixture<CrearClienteComponent>;
  let clienteService: ClienteService;
  let clienteTest: Cliente;
  let mockRsp: { error: boolean, msg: string, data: Cliente };
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CrearClienteComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        
      ],
      providers: [
        HttpService,
        ClienteService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                  id: null
              },
            },
          },
        }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearClienteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    clienteTest = new Cliente( 1, "12345678", "Pruebas S.A.S.", "Kai Bennington", "3013101550", "Cll 000 # 01 - 04");
    mockRsp = {error:true, msg: "", data: clienteTest};
    spyOn(clienteService, 'obtenerPorId').and.returnValue(of(mockRsp));
    
    fixture.detectChanges();
    
  });

  it('deberia crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario deberia ser invalido por falta de campo Obligatorio', () => {
    expect(component.clienteForm.valid).toBeFalsy();
  });

  it('formulario deberia ser valido', () => {
    expect(component.clienteForm.valid).toBeFalsy();
    component.clienteForm.controls['id'].setValue(clienteTest.id);
    component.clienteForm.controls['nitCliente'].setValue(clienteTest.nitCliente);
    component.clienteForm.controls['razonSocial'].setValue(clienteTest.razonSocial);
    component.clienteForm.controls['nombreRepresentante'].setValue(clienteTest.nombreRepresentante);
    component.clienteForm.controls['telefono'].setValue(clienteTest.telefono);
    component.clienteForm.controls['direccion'].setValue(clienteTest.direccion);

    expect(component.clienteForm.valid).toBeTrue();
  });

  it('deberia guardar un cliente', () => {
    component.clienteForm.controls['id'].setValue(clienteTest.id);
    component.clienteForm.controls['nitCliente'].setValue(clienteTest.nitCliente);
    component.clienteForm.controls['razonSocial'].setValue(clienteTest.razonSocial);
    component.clienteForm.controls['nombreRepresentante'].setValue(clienteTest.nombreRepresentante);
    component.clienteForm.controls['telefono'].setValue(clienteTest.telefono);
    component.clienteForm.controls['direccion'].setValue(clienteTest.direccion);

    component.ejecutarAccion();
    expect(component.isCrear).toBeTrue();
  });


  it('deberia Actualizar un cliente', () => {
    component.clienteForm.controls['id'].setValue('111');
    component.clienteForm.controls['nitCliente'].setValue(clienteTest.nitCliente);
    component.clienteForm.controls['razonSocial'].setValue('Razon Social Prueba S.A.S');
    component.clienteForm.controls['nombreRepresentante'].setValue('User Test');
    component.clienteForm.controls['telefono'].setValue(clienteTest.telefono);
    component.clienteForm.controls['direccion'].setValue(clienteTest.direccion);

    component.isCrear = false;
    component.ejecutarAccion();
    expect(component.isCrear).toBeFalse();
  });
  
});
