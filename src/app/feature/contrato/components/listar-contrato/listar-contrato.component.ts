import { Component, OnInit } from '@angular/core';
import { Contrato } from '@feature/contrato/shared/model/contrato';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';
import { faPencilAlt, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-contrato',
  templateUrl: './listar-contrato.component.html',
  styleUrls: ['./listar-contrato.component.scss']
})
export class ListarContratoComponent implements OnInit {

  public icons: any[] = [faSearch,faPencilAlt,faTrashAlt];
  public listaContratos: Observable<Contrato[]>;

  public pagActual: number = 0;
  public totalContratos: number = 0;
  public maxPorPag:number = 5;

  public buscar: string = '';

  constructor(protected contratoService: ContratoService) { }

  ngOnInit(): void {
    this.listaContratos = this.contratoService.consultar();
    this.listaContratos.subscribe(result => {this.totalContratos = result.length});
  }

  eliminarContrato(id: number): void {
    alert("Eliminando"+id);
  }

  modificarContrato(id: number): void {
    alert("modificar"+id);
  }

}
