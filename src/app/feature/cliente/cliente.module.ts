import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ClienteRoutingModule } from './cliente-routing.module';
import { FiltroTablaClass } from './components/cliente/cliente-filtro-pipe-class';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';


@NgModule({
  declarations: [
    ClienteComponent,
    CrearClienteComponent,
    FiltroTablaClass
  ],
  imports: [
    SharedModule,
    ClienteRoutingModule
  
  ]
})
export class ClienteModule { }
