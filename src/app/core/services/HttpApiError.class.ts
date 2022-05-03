import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
})
export class HttpApiErrorClass {

    constructor(protected http: HttpService) { }

    error(error: HttpErrorResponse) {
        let mensajeError = '';
        if (error.error instanceof ErrorEvent) {
          mensajeError = error.error.message;
        } else {
          mensajeError = `Codigo de Error: ${error.status} \n mensaje: ${error.error.mensaje}`;
        }
        return of({ error: true, msg: mensajeError, data: error.error });
    }

}