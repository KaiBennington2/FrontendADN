export class Cliente {
    id: number;
    nitCustomer: string;
    companyName: string;
    representantName: string;
    phone: string;
    adress: string;

    constructor(id: number, nitCustomer: string, companyName: string, representantName: string, phone: string, adress: string) {
        this.id = id;
        this.nitCustomer = nitCustomer;
        this.companyName = companyName;
        this.representantName = representantName;
        this.phone = phone;
        this.adress = adress;
    }
}