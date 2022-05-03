import { Injectable } from '@angular/core';
import { HttpApiErrorClass } from '@core/services/HttpApiError.class';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contrato } from '../model/contrato';
import { DetalleContrato } from '../model/detalleContrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends HttpApiErrorClass {  

  public consultar() {
    return this.http.doGet<Contrato[]>(`${environment.endpoint}/contratos`, this.http.optsName('consultar contratos'));
  }

  public getContratoById(id: number): Observable<{
    error: boolean,
    msg: string,
    data: Contrato
  }> {
    const response = { error: false, msg: '', data: null}
    return this.http.doGet<Contrato>(`${environment.endpoint}/contratos/${id}`, this.http.optsName('obtener contrato por id'))
      .pipe(
        map(r => {
          response.data = r;
          return response;
        }), catchError(this.error)
      );
  }

  public getDetalleContratoById(id: number): Observable<{
    error: boolean,
    msg: string,
    data: DetalleContrato
  }> {
    const response = { error: false, msg: '', data: null }
    return this.http.doGet<DetalleContrato>
      (`${environment.endpoint}/contratos/op?detail=${id}`, this.http.optsName('obtener los detaller del contrato'))
        .pipe(
          map(r => {
            response.data = r;
            return response;
          }), catchError(this.error)
        );
  }

  public guardar(contrato: Contrato): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = { error: false, msg: '', data: null}
    return this.http.doPost<Contrato, { error: boolean, msg: string, data: any }>
      (`${environment.endpoint}/contratos`, contrato, this.http.optsName('crear contratos'))
        .pipe(
          map(r => {
            response.data = r;
            return response;
          }),catchError(this.error)
        );
  }

  public eliminar(id: number): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = { error: false, msg: '', data: null };
    return this.http.doDelete<{ error: boolean, msg: string, data: any }>
      (`${environment.endpoint}/contratos/${id}`, this.http.optsName('eliminar contratos'))
        .pipe(
          map(r => {
            response.data = r;
            return response;
          }), catchError(this.error)
        );
  }
}
