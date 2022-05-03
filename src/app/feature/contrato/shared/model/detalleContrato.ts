import { Contrato } from "./contrato";

export class DetalleContrato extends Contrato {

    fechaCorte: Date;
    fechaCorteAnterior: Date;
    valorContrato: number;

    constructor(
        id: number,
        nitCliente: string,
        tiempoContratoMeses: number,
        tipoMoneda: string,
        trmAplicada: number,
        paquete: string,
        fechaInstalacion: Date,
        fechaCorte: Date,
        fechaCorteAnterior: Date,
        valorContrato: number
        ) {
        super(id, nitCliente, tiempoContratoMeses, tipoMoneda, trmAplicada, paquete, fechaInstalacion);
        this.fechaCorte = fechaCorte;
        this.fechaCorteAnterior = fechaCorteAnterior;
        this.valorContrato = valorContrato;
    }
}