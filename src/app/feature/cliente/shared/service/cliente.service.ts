import { Injectable } from '@angular/core';
import { HttpApiErrorClass } from '@core/services/HttpApiError.class';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends HttpApiErrorClass {

  public consultar() {
    return this.http.doGet<Cliente[]>(`${environment.endpoint}/clientes`, this.http.optsName('consultar clientes'));
  }

  public obtenerPorId(id: number): Observable<{
    error: boolean,
    msg: string,
    data: Cliente
  }> {
    const response = { error: false, msg: '', data: null };
    return this.http.doGet<Cliente>
      (`${environment.endpoint}/clientes/${id}`, this.http.optsName('obtener cliente por Id'))
        .pipe(
          map(r => {
            response.data = r;
            return response;
          }), catchError(this.error)
        );
  }

  public obtenerPorNit(nit: String): Observable<{
    error: boolean,
    msg: string,
    data: Cliente
  }> {
    const response = { error: false, msg: '', data: null };
    return this.http.doGet<Cliente>
      (`${environment.endpoint}/clientes/find?nit=${nit}`, this.http.optsName('obtener cliente por Nit'))
        .pipe(
          map(r => {
            response.data = r;
            return response;
          }), catchError(this.error)
        );
  }

  public guardar(cliente: Cliente): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = { error: false, msg: '', data: null };
    return this.http.doPost<Cliente, { error: boolean, msg: string, data: any }>
      (`${environment.endpoint}/clientes`, cliente, this.http.optsName('crear clientes'))
        .pipe(
          map(r => {
            response.data = r;
            return response;
          }), catchError(this.error)
        );
  }

  public modificar(cliente: Cliente): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = { error: false, msg: '', data: null };
    return this.http.doPut<Cliente, { error: boolean, msg: string, data: any }>
      (`${environment.endpoint}/clientes/${cliente.id}`, cliente, this.http.optsName('actualizar clientes'))
        .pipe(
          map(r =>{
            response.data = r;
            return response;
          }), catchError(this.error)
        );
  }

  public eliminar(id: number): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = { error: false, msg: '', data: null };
    return this.http.doDelete<{
      error: boolean,
      msg: string,
      data: any
    }>(`${environment.endpoint}/clientes/${id}`, this.http.optsName('eliminar clientes'))
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }), catchError(this.error)
      );
  }
}
