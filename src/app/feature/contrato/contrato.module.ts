import { NgModule } from '@angular/core';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './components/contrato/contrato.component';
import { CrearContratoComponent } from './components/crear-contrato/crear-contrato.component';
import { ListarContratoComponent } from './components/listar-contrato/listar-contrato.component';
import { SharedModule } from '@shared/shared.module';
import { FiltroTablaClass } from './components/listar-contrato/contrato-filtro-pipe-class';
import { DetalleContratoComponent } from './components/detalle-contrato/detalle-contrato.component';


@NgModule({
  declarations: [
    ContratoComponent,
    CrearContratoComponent,
    ListarContratoComponent,
    FiltroTablaClass,
    DetalleContratoComponent
  ],
  imports: [
    SharedModule,
    ContratoRoutingModule
  ]
})
export class ContratoModule { }
