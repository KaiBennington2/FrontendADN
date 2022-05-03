export class Contrato {
    id: number;
    nitCliente: string;
    tiempoContratoMeses: number;
    tipoMoneda: string;
    trmAplicada: number;
    paquete: string;
    fechaInstalacion: Date;

    constructor(id: number, nitCliente: string, tiempoContratoMeses: number, tipoMoneda: string, trmAplicada: number, paquete: string, fechaInstalacion: Date) {
        this.id = id;
        this.nitCliente = nitCliente;
        this.tiempoContratoMeses = tiempoContratoMeses;
        this.tipoMoneda = tipoMoneda;
        this.trmAplicada = trmAplicada;
        this.paquete = paquete;
        this.fechaInstalacion = fechaInstalacion;
    }
}