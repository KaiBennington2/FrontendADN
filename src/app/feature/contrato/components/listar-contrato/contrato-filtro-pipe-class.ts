import { Pipe } from "@angular/core";
import { Contrato } from "@feature/contrato/shared/model/contrato";
import { FiltroTablaPipe } from "@shared/pipe";

@Pipe({
    name: 'filtroTablaContrato'
})
export class FiltroTablaClass extends FiltroTablaPipe{
     
    override transform(registros: Contrato[], paginaActual: number, maxItemsPagina: number, buscar: string = ''): Contrato[] {

        let registrosActuales = registros.slice((paginaActual - 1) * maxItemsPagina,paginaActual * maxItemsPagina);

        if (buscar.length === 0) {
            return registrosActuales;
        }

        const registrosFiltrados = registros.filter( rsp =>
            rsp.nitCliente.toLowerCase().includes( buscar.toLowerCase())
            || rsp.paquete.toLowerCase().includes(buscar.toLowerCase())
        );
        return registrosFiltrados;
        
    }

}