import { Pipe } from "@angular/core";
import { Cliente } from "@cliente/shared/model/cliente";
import { FiltroTablaPipe } from "@shared/pipe";

@Pipe({
    name: 'filtroTablaCliente'
})
export class FiltroTablaClass extends FiltroTablaPipe{
     
    override transform(registros: Cliente[], paginaActual: number, maxItemsPagina: number, buscar: string = ''): Cliente[] {

        let registrosActuales = registros.slice((paginaActual - 1) * maxItemsPagina,paginaActual * maxItemsPagina);

        if (buscar.length === 0) {
            return registrosActuales;
        }

        const registrosFiltrados = registros.filter( rsp =>
            rsp.nitCustomer.toLowerCase().includes( buscar.toLowerCase())
            || rsp.companyName.toLowerCase().includes(buscar.toLowerCase())
            || rsp.representantName.toLowerCase().includes(buscar.toLowerCase())
        );
        return registrosFiltrados;
        
    }

}