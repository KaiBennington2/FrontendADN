import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratoComponent } from './components/contrato/contrato.component';
import { CrearContratoComponent } from './components/crear-contrato/crear-contrato.component';
import { ListarContratoComponent } from './components/listar-contrato/listar-contrato.component';

const routes: Routes = [
  {
    path: '',
    component: ContratoComponent,
    children: [
      {
        path: 'crear',
        component: CrearContratoComponent
      },
      {
        path: 'listar',
        component: ListarContratoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }
