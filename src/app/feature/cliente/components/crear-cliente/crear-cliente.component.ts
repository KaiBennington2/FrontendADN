import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '@cliente/shared/service/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

  clienteForm: FormGroup;

  constructor(protected clienteService: ClienteService) { }

  ngOnInit(): void {
    this.construirFormularioCliente();
  }

  crear() {
    this.clienteService.guardar(this.clienteForm.value);
  }

  private construirFormularioCliente() {
    this.clienteForm = new FormGroup({
      nitCliente: new FormControl('', [Validators.required]),
      razonSocial: new FormControl('', [Validators.required]),
      nombreRepresentante: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required])
    });

  }

  saludo() {
    alert('Saludo')
  }
}
