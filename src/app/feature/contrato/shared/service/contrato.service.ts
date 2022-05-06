import { Injectable } from '@angular/core';
import { HttpApiErrorClass } from '@core/services/HttpApiError.class';
import { respuestaHttpApi } from '@core/services/IHttpResponseApi';
import { Observable } from 'rxjs';
import { Contrato } from '../model/contrato';
import { DetalleContrato } from '../model/detalleContrato';


@Injectable({
  providedIn: 'root'
})
export class ContratoService extends HttpApiErrorClass {

  pathBaseModulo: string = `${this.env}/contratos`;
  private rspPeticion;

  public consultar() {
    return this.http.doGet<Contrato[]>(this.pathBaseModulo, this.http.optsName('consultar contratos'));
  }

  public getContratoById(id: number): Observable<respuestaHttpApi<Contrato>> {
    this.rspPeticion = this.http.doGet<Contrato>
                      (`${this.pathBaseModulo}/${id}`, this.http.optsName('obtener contrato por id'))
    return this.mapearRespuesta(this.rspPeticion);
  }

  public getDetalleContratoById(id: number): Observable<respuestaHttpApi<DetalleContrato>> {
    this.rspPeticion = this.http.doGet<DetalleContrato>
                      (`${this.pathBaseModulo}/op?detail=${id}`, this.http.optsName('obtener los detaller del contrato'))
    return this.mapearRespuesta(this.rspPeticion);
  }

  public guardar(contrato: Contrato): Observable<respuestaHttpApi<any>> {
    this.rspPeticion = this.http.doPost<Contrato, respuestaHttpApi<any>>
                      (`${this.pathBaseModulo}`, contrato, this.http.optsName('crear contratos'))
    return this.mapearRespuesta(this.rspPeticion);
  }

  public eliminar(id: number): Observable<respuestaHttpApi<any>> {
    this.rspPeticion = this.http.doDelete<respuestaHttpApi<any>>
                      (`${this.pathBaseModulo}/${id}`, this.http.optsName('eliminar contratos'));
    return this.mapearRespuesta(this.rspPeticion);
  }

}