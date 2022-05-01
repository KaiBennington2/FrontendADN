import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Cliente[]>(`${environment.endpoint}/clientes`, this.http.optsName('consultar clientes'));
  }

  public guardar(cliente: Cliente) {
    return this.http.doPost<Cliente, number>(`${environment.endpoint}/clientes`, cliente,
                                                this.http.optsName('crear clientes'));
  }

  public modificar(cliente: Cliente) {
    return this.http.doPut<Cliente, number>(`${environment.endpoint}/clientes/${cliente.id}`, cliente,
                                                this.http.optsName('actualizar clientes'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/clientes/${id}`,
                                                 this.http.optsName('eliminar clientes'));
  }
}
