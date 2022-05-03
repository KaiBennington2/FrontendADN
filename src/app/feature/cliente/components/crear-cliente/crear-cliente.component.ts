import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { Cliente } from '@feature/cliente/shared/model/cliente';

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

  constructor(protected clienteService: ClienteService,
              private route: ActivatedRoute
              ) {
                this.id = this.route.snapshot.params['id'];
               }

  ngOnInit(): void {
    this.construirFormularioCliente();
    if (this.id!=null) {
      this.isCrear = false;
      this.getClienteById(this.id);
    }
  }

  getClienteById(id: number):void{
    this.clienteService.obtenerPorId(id).subscribe(r=>{ this.llenarClienteForm(r)});
  }

  llenarClienteForm(cliente: Cliente){
    this.clienteForm.controls['id'].setValue(cliente.id);
    this.clienteForm.controls['nitCliente'].setValue(cliente.nitCliente);
    this.clienteForm.controls['razonSocial'].setValue(cliente.razonSocial);
    this.clienteForm.controls['nombreRepresentante'].setValue(cliente.nombreRepresentante);
    this.clienteForm.controls['telefono'].setValue(cliente.telefono);
    this.clienteForm.controls['direccion'].setValue(cliente.direccion);
  }

  EjecutarAccion() {
    if (this.isCrear) {
      this.clienteService.guardar(this.clienteForm.value).subscribe();
    this.clienteForm.reset();
      
    }else{
      this.clienteService.modificar(this.clienteForm.value).subscribe();
    }
    
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

  
}
