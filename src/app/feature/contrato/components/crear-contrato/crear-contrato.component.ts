import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '@feature/cliente/shared/model/cliente';
import { ClienteService } from '@feature/cliente/shared/service/cliente.service';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.scss']
})
export class CrearContratoComponent implements OnInit {

  model:any;
  listaClientes: Observable<Cliente[]>;

  constructor(protected clienteService: ClienteService,
              protected contratoService: ContratoService) { }

  contratoForm: FormGroup;

  ngOnInit(): void {
    this.construirFormularioContrato();
    this.listaClientes = this.clienteService.consultar();
  }

  private construirFormularioContrato() {
    this.contratoForm = new FormGroup({
      nitCliente: new FormControl('', [Validators.required]),
      tipoMoneda: new FormControl('', [Validators.required]),
      trmAplicada: new FormControl('', [Validators.required]),
      paquete: new FormControl('', [Validators.required]),
      fechaInstalacion: new FormControl('', [Validators.required]),
    });
  }

  guardar() {
    this.contratoService.guardar(this.contratoForm.value).subscribe();
    this.contratoForm.reset();
  }

}
