import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public icons: any[] = [faSearch,faPencilAlt,faTrashAlt];
  public listaClientes: Observable<Cliente[]>;

  public pagActual: number = 0;
  public totalClientes: number = 0;
  public maxPorPag:number = 5;

  public buscar: string = '';

  constructor(protected clienteService: ClienteService, public modal:NgbActiveModal) { }

  ngOnInit(): void {
    this.listaClientes = this.clienteService.consultar();
    this.listaClientes.subscribe(result => {this.totalClientes= result.length});
  }

  alert(){
    alert('eliminando');
  }
}
