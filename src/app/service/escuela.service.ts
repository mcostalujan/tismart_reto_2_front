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

  public obtenerEscuelaPorId(idEscuela: string): Observable<Escuela> {
    return this.http.get<Escuela>(
      `${this.host}/escuelas/buscar/id/${idEscuela}`
    );
  }

  public obtenerTodasLasEscuelas(): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(`${this.host}/escuelas/listar`);
  }

  public obtenerTodasLasEscuelasPorFecha(fecha: Date): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(`${this.host}/escuelas/listar/fecha/${fecha}`);
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

  public exportarEscuelasPorFechaRegistroTablaPDF(fechaRegistro: Date): Observable<Blob> {
    return this.http.get<Blob>(`${this.host}/escuelas/exportar/pdf/fecha/${fechaRegistro}`);
  }

  public exportarEscuelasPorFechaRegistroBarchartPDF(fechaRegistro: Date): Observable<Blob> {
    return this.http.get<Blob>(`${this.host}/escuelas/exportar/barchart/alumnosPorEscuela/pdf/fecha/${fechaRegistro}`);
  }

  public exportarEscuelasPorFechaRegistroPieChartPDF(fechaRegistro: Date): Observable<Blob> {
    return this.http.get<Blob>(`${this.host}/escuelas/exportar/piechart/alumnosPorEscuela/pdf/fecha/${fechaRegistro}`);
  }


  public createEscuelaSaveFormData(
    idEscuela: string,
    nombre: string,
    cantidadAlumnos: string,
    recursoFiscal: string,
    licenciada: string,
    clasificacion: string,
    fechaRegistro: string,
    idFacultad: string
  ): FormData {
    const formData = new FormData();
    if (idEscuela != "") {
      formData.append('idEscuela', idEscuela);
    }
    formData.append('nombre', nombre);
    formData.append('cantidadAlumnos', cantidadAlumnos);
    formData.append('recursoFiscal', recursoFiscal);
    formData.append('licenciada', licenciada);
    formData.append('clasificacion', clasificacion);
    formData.append('fechaRegistro', fechaRegistro);
    formData.append('idFacultad', idFacultad);
    return formData;
  }
}
