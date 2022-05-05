import { Contrato } from "./contrato";

export class DetalleContrato extends Contrato {

    fechaCorte: Date;
    fechaCorteAnterior: Date;
    valorContrato: number;

    constructor(
        // id: number,
        // nitCliente: string,
        // tiempoContratoMeses: number,
        // tipoMoneda: string,
        // trmAplicada: number,
        // paquete: string,
        // fechaInstalacion: Date,
        contrato: Contrato,
        fechaCorte: Date,
        fechaCorteAnterior: Date,
        valorContrato: number
        ) {
        super(
            contrato.id,
            contrato.nitCliente,
            contrato.tiempoContratoMeses,
            contrato.tipoMoneda,
            contrato.trmAplicada,
            contrato.paquete,
            contrato.fechaInstalacion);
        this.fechaCorte = fechaCorte;
        this.fechaCorteAnterior = fechaCorteAnterior;
        this.valorContrato = valorContrato;
    }
}