import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ClienteRoutingModule } from './cliente-routing.module';
import { FiltroTablaClass } from './components/listar-cliente/cliente-filtro-pipe-class';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';


@NgModule({
  declarations: [
    ClienteComponent,
    CrearClienteComponent,
    FiltroTablaClass,
    ListarClienteComponent    
  ],
  imports: [
    SharedModule,
    ClienteRoutingModule
  
  ]
})
export class ClienteModule { }
