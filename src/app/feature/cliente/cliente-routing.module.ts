import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    
  },
  {
    path: 'crear',
    component: CrearClienteComponent
  },
  {
    path: '**',
    component: ClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule { }
