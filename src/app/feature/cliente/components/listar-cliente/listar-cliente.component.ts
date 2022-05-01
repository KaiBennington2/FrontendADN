import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss']
})
export class ListarClienteComponent implements OnInit {

  public icons: any[] = [faSearch,faPencilAlt,faTrashAlt];
  public listaClientes: Observable<Cliente[]>;

  public pagActual: number = 0;
  public totalClientes: number = 0;
  public maxPorPag:number = 5;

  public buscar: string = '';

  constructor(protected clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listaClientes = this.clienteService.consultar();
    this.listaClientes.subscribe(result => {this.totalClientes= result.length});
  }

  eliminarCliente(id: number): void {
    this.clienteService.eliminar(id);
  }

  modificarCliente(id: number): void {
    alert("modificar"+id);
  }


}
