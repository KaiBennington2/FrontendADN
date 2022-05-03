import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { Cliente } from '@feature/cliente/shared/model/cliente';


const CREADO = 'El cliente fue guardado de manera exitosa.';
const MODIFICADO = 'El cliente ha sido modificado con exito.';
const REDIRECCION_A_RAIZ = '/cliente';
const REDIRECCION_A_LISTADO = REDIRECCION_A_RAIZ + '/listar';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

  clienteForm: FormGroup;

  isCrear: boolean = true;
  cliente: Cliente;
  id: number;

  ngOnInit(): void {
    this.construirFormularioCliente();
    if (this.id != null) {
      this.isCrear = false;
      this.getClienteById(this.id);
    }
  }

  constructor(protected clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router  ) {
    this.id = this.route.snapshot.params['id'];
  }

  private construirFormularioCliente() {
    this.clienteForm = new FormGroup({
      id: new FormControl(''),
      nitCliente: new FormControl('', [Validators.required]),
      razonSocial: new FormControl('', [Validators.required]),
      nombreRepresentante: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required])
    });
  }  

  getClienteById(id: number): void {
    this.clienteService.obtenerPorId(id).subscribe(r => {
      if (r.error) {
        alert(r.msg);
        this.router.navigateByUrl(REDIRECCION_A_LISTADO);
      } else {
        this.llenarClienteForm(r.data) 
      }       
    });
  }

  llenarClienteForm(cliente: Cliente) {
    this.clienteForm.controls['id'].setValue(cliente.id);
    this.clienteForm.controls['nitCliente'].setValue(cliente.nitCliente);
    this.clienteForm.controls['razonSocial'].setValue(cliente.razonSocial);
    this.clienteForm.controls['nombreRepresentante'].setValue(cliente.nombreRepresentante);
    this.clienteForm.controls['telefono'].setValue(cliente.telefono);
    this.clienteForm.controls['direccion'].setValue(cliente.direccion);
  }

  ejecutarAccion() {    
    if (this.isCrear) {
      this.clienteService.guardar(this.clienteForm.value).subscribe(r => {
        if (r.error) {
          alert(r.data.mensaje); return;
        } else {
          alert(CREADO);
          this.router.navigateByUrl(REDIRECCION_A_LISTADO);
        }
      });
    } else {
      this.clienteService.modificar(this.clienteForm.value).subscribe(r => {
        if (r.error) {
          alert(r.data.mensaje); return;
        } else {
          alert(MODIFICADO);
          this.router.navigateByUrl(REDIRECCION_A_LISTADO);
        }
      });
    }
  }

  cancelar(){
    this.router.navigateByUrl(REDIRECCION_A_RAIZ);
  }
  
}
