export class Cliente {
    id: number;
    nitCliente: string;
    razonSocial: string;
    nombreRepresentante: string;
    telefono: string;
    direccion: string;

    constructor(id: number, nitCliente: string, razonSocial: string, nombreRepresentante: string, telefono: string, direccion: string) {
        this.id = id;
        this.nitCliente = nitCliente;
        this.razonSocial = razonSocial;
        this.nombreRepresentante = nombreRepresentante;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    toString(): string {
        return `id ${this.id} nit ${this.nitCliente} nom rep ${this.nombreRepresentante} razon ${this.razonSocial} 
        telefono ${this.telefono} direccion ${this.direccion}`;
    }
}