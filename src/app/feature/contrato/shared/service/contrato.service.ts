import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Contrato } from '../model/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Contrato[]>(`${environment.endpoint}/contratos`, this.http.optsName('consultar contratos'));
  }

  public guardar(contrato: Contrato) {
    return this.http.doPost<Contrato, number>(`${environment.endpoint}/contratos`, contrato,
                                                this.http.optsName('crear contratos'));
  }
}
