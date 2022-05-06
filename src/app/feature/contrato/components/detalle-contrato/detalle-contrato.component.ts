import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '@feature/cliente/shared/model/cliente';
import { ClienteService } from '@feature/cliente/shared/service/cliente.service';
import { DetalleContrato } from '@feature/contrato/shared/model/detalleContrato';

@Component({
  selector: 'app-detalle-contrato',
  templateUrl: './detalle-contrato.component.html',
  styleUrls: ['./detalle-contrato.component.scss']
})
export class DetalleContratoComponent implements OnInit{

  @Input() detalleContrato: DetalleContrato;

  cliente: Cliente;

  constructor(protected clienteService: ClienteService) { }

  ngOnInit(): void {
    if (this.detalleContrato != null) {
      this.llenarCliente();      
    }    
  }

  private llenarCliente() {
    this.clienteService.obtenerPorNit(this.detalleContrato.nitCliente).subscribe(r => {
      if (r.error) {
        alert(r.msg);
      }else{
        this.cliente = r.data;
      }
    });    
  }

}
