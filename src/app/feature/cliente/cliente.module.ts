import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './components/cliente/cliente.component';


@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    SharedModule,
    ClienteRoutingModule
  
  ]
})
export class ClienteModule { }
