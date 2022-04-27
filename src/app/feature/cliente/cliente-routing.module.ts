import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { CrearProductoComponent } from "@producto/components/crear-producto/crear-producto.component";
import { ClienteComponent } from "./components/cliente/cliente.component";

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    // children: [
    //   {
    //     path: 'crear',
    //     component: CrearProductoComponent
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
