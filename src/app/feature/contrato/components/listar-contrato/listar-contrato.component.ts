import { Component, OnInit } from '@angular/core';
import { Contrato } from '@feature/contrato/shared/model/contrato';
import { DetalleContrato } from '@feature/contrato/shared/model/detalleContrato';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';
import { faFileLines, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

const ELIMINADO = 'El contrato fue eliminado con exito.';

@Component({
  selector: 'app-listar-contrato',
  templateUrl: './listar-contrato.component.html',
  styleUrls: ['./listar-contrato.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListarContratoComponent implements OnInit {

  public icons: any[] = [faSearch,faFileLines,faTrashAlt];
  public listaContratos: Contrato[];
  public detalleContrato: DetalleContrato;

  public pagActual: number = 0;
  public totalContratos: number = 0;
  public maxPorPag:number = 5;

  public buscar: string = '';

  ngOnInit(): void {
    this.llenarListaContratos();    
  }

  constructor(protected contratoService: ContratoService,
              config: NgbModalConfig,
              private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  llenarListaContratos(){
    this.contratoService.consultar().subscribe(result => {
      this.listaContratos = result;
      this.totalContratos = result.length
    });
  }

  getDetalleContrato(id: number, content: any) {
    this.contratoService.getDetalleContratoById(id).subscribe(r => {
      if (r.error) { alert(r.msg); return; }
      else { this.detalleContrato = r.data; 
            this.modalService.open(content, { centered: true });
      }      
    });    
  }  

  eliminarContrato(id: number): void {
    this.contratoService.eliminar(id).subscribe(r=> {
      if (r.error) {
        alert(r.data.mensaje);
      }else {
        alert(ELIMINADO);
        this.llenarListaContratos();
      }
    });
  }

}
