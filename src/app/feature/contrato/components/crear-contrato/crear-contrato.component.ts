import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '@feature/cliente/shared/model/cliente';
import { ClienteService } from '@feature/cliente/shared/service/cliente.service';
import { Contrato } from '@feature/contrato/shared/model/contrato';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';

const CREADO = 'El contrato fue guardado de manera exitosa.';
const REDIRECCION_A_RAIZ = '/contrato';
const REDIRECCION_A_LISTADO = REDIRECCION_A_RAIZ + '/listar';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.scss']
})
export class CrearContratoComponent implements OnInit {

  contratoForm: FormGroup;
  model:any;
  listaClientes: Cliente[];
  totalClientes: number;
  contrato: Contrato;

  ngOnInit(): void {
    this.construirFormularioContrato();
    this.llenarListaClientes();
  }

  constructor(protected clienteService: ClienteService,
              protected contratoService: ContratoService,
              private router: Router ) {
  }  

  private construirFormularioContrato() {
    this.contratoForm = new FormGroup({
      id: new FormControl(''),
      nitCliente: new FormControl(null, [Validators.required]),
      tiempoContratoMeses: new FormControl(''),
      tipoMoneda: new FormControl('', [Validators.required]),
      trmAplicada: new FormControl('', [Validators.required]),
      paquete: new FormControl(null, [Validators.required]),
      fechaInstalacion: new FormControl('', [Validators.required]),
    });
  }

  private llenarListaClientes() {
    this.clienteService.consultar().subscribe(result => {
          this.listaClientes = result;
          this.totalClientes = result.length
    });
  }

  guardar() {    
    this.contratoService.guardar(this.contratoForm.value).subscribe( r => {
      if (r.error) {
        alert(r.data.mensaje); return;
      }else {
        alert(CREADO);
        this.router.navigateByUrl(REDIRECCION_A_LISTADO);
      }
    });
  }

  cancelar(){
    this.router.navigateByUrl(REDIRECCION_A_RAIZ);
  }

}
