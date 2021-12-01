import { Facultad } from './facultad';
export class Escuela {

  idEscuela: bigint;
  nombre: string;
  cantidadAlumnos: number;
  recursoFiscal: number;
  licenciada: boolean;
  clasificacion: number;
  fechaRegistro: Date;
  fechaConFormato: string;
  facultad: Facultad;

}
