import { Facultad } from './../model/facultad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Escuela } from '../model/escuela';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public obtenerFacultadPorId(idFacultad: bigint): Observable<Facultad> {
    return this.http.get<Facultad>(
      `${this.host}/facultades/buscar/id/${idFacultad}`
    );
  }

  public obtenerTodasLasFacultades(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(`${this.host}/facultades/listar`);
  }
}
