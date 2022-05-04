import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { Cliente } from '@feature/cliente/shared/model/cliente';
import { ClienteService } from '@feature/cliente/shared/service/cliente.service';
import { of } from 'rxjs';

import { CrearClienteComponent } from './crear-cliente.component';

describe('(1) - Test del componente "CrearClienteComponent"', () => {
  let component: CrearClienteComponent;
  let fixture: ComponentFixture<CrearClienteComponent>;
  let clienteService: ClienteService;
  let listaClientes: Cliente[] = [
    {
      "id": 1,
      "nitCliente": "12345678",
      "razonSocial": "Pruebas S.A.S.",
      "nombreRepresentante": "Kai Bennington",
      "telefono": "3013101550",
      "direccion": "Cll 000 # 01 - 04"
    },
    {
      "id": 2,
      "nitCliente": "0987654",
      "razonSocial": "Tests S.A.S.T",
      "nombreRepresentante": "Alonso Bennington",
      "telefono": "3023111660",
      "direccion": "Cll 111 # 03 - 04"
    },
    {
      "id": 3,
      "nitCliente": "1029384",
      "razonSocial": "Empresa S.A.S.",
      "nombreRepresentante": "Cliente Prueba",
      "telefono": "3023013065",
      "direccion": "Cll 222 # 13 - 24"
    },
    {
      "id": 5,
      "nitCliente": "1234567",
      "razonSocial": "Pruebas S.A.S.",
      "nombreRepresentante": "Kai Bennington",
      "telefono": "3013101550",
      "direccion": "Cll 000 # 01 - 02"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CrearClienteComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [ClienteService, HttpService, ActivatedRoute, Router]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearClienteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'consultar').and.returnValue(of(listaClientes));
    fixture.detectChanges();
    
  });

  it('deberia crear componente', () => {
    expect(component).toBeTruthy();
  });
  
});
