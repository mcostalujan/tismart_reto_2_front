import { CustomHttpResponse } from './../model/custom-http-response';
import { Escuela } from './../model/escuela';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EscuelaService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public obtenerEscuelaPorId(idEscuela: bigint): Observable<Escuela> {
    return this.http.get<Escuela>(
      `${this.host}/escuelas/buscar/id/${idEscuela}`
    );
  }

  public obtenerTodasLasEscuelas(): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(`${this.host}/escuelas/listar`);
  }

  public guardarEscuela(formData: FormData): Observable<Escuela> {
    return this.http.post<Escuela>(
      `${this.host}/escuelas/guardar/form`,
      formData
    );
  }

  public eliminarEscuela(idEscuela: bigint): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(
      `${this.host}/escuelas/eliminar/${idEscuela}`
    );
  }

  public createEscuelaSaveFormData(
    idEscuela: bigint,
    nombre: string,
    cantidadAlumnos: number,
    recursoFiscal: number,
    licenciada: boolean,
    clasificacion: number,
    fechaRegistro: string,
    idFacultad: bigint
  ): FormData {
    const formData = new FormData();
    if (idEscuela != undefined) {
      formData.append('idEscuela', JSON.stringify(idEscuela));
    }
    formData.append('nombre', nombre);
    formData.append('cantidadAlumnos', cantidadAlumnos.toString());
    formData.append('recursoFiscal', recursoFiscal.toString());
    formData.append('licenciada', licenciada.toString());
    formData.append('clasificacion', clasificacion.toString());
    formData.append('fechaRegistro', fechaRegistro);
    formData.append('idFacultad', idFacultad.toString());
    return formData;
  }
}
