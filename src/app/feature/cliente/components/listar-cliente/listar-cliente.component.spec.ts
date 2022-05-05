import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarClienteComponent } from './listar-cliente.component';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { Cliente } from '@cliente/shared/model/cliente';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { FiltroTablaClass } from './cliente-filtro-pipe-class';

describe('(2) - Test del componente "ListarClienteComponent"', () => {
  let component: ListarClienteComponent;
  let fixture: ComponentFixture<ListarClienteComponent>;
  let clienteService: ClienteService;

  let mockListaClientes: Cliente[] = [
    new Cliente( 1, "12345678", "Pruebas S.A.S.", "Kai Bennington", "3013101550", "Cll 000 # 01 - 04"),
    new Cliente( 2, "0987654", "Tests S.A.S.", "Alonso Bennington", "3023111660", "Cll 111 # 03 - 04"),
    new Cliente( 3, "1029384", "Empresa S.A.S.", "Cliente Prueba", "3023013065", "Cll 222 # 13 - 24"),
    new Cliente( 4, "1234567", "UnaMas S.A.S.", "Yo uno", "1234567890", "Cll 222 # 21 - 34")
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ListarClienteComponent,
        FiltroTablaClass
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ClienteService,
        HttpService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarClienteComponent);
    component = fixture.componentInstance;

    clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'consultar').and.returnValue(of(mockListaClientes));    
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia listar los clientes', () => {
    expect(mockListaClientes).toBe(component.listaClientes);
  });

  it('deberia calcular el total de los clientes', () => {
    expect(4).toBe(component.totalClientes);
  });

});
