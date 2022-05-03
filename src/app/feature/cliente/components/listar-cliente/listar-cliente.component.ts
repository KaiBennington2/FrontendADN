import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';

const ELIMINADO = 'El cliente fue eliminado con exito.';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss']
})
export class ListarClienteComponent implements OnInit {

  public icons: any[] = [faSearch,faPencilAlt,faTrashAlt];
  public listaClientes: Cliente[];

  public pagActual: number = 0;
  public totalClientes: number = 0;
  public maxPorPag:number = 5;

  public buscar: string = '';

  constructor(protected clienteService: ClienteService) { }

  ngOnInit(): void {
    this.llenarListaClientes();
  }

  private llenarListaClientes(){
    this.clienteService.consultar().subscribe(result => {
      this.listaClientes= result;
      this.totalClientes= result.length;
    });
  }

  eliminarCliente(id: number): void {
    this.clienteService.eliminar(id).subscribe(r=> {
      if (r.error) {
        alert(r.data.mensaje);
      }else {
        alert(ELIMINADO);
        this.llenarListaClientes();
      }
    });
  }

}
