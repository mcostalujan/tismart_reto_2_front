import { EscuelaDto } from './../dto/escuelaDto';
import { EscuelaService } from './../../service/escuela.service';
import { FacultadService } from './../../service/facultad.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Escuela } from 'src/app/model/escuela';
import { Facultad } from 'src/app/model/facultad';
import { DatePipe } from '@angular/common';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { empty } from 'rxjs';

@Component({
  selector: 'app-editar-escuela',
  templateUrl: './editar-escuela.component.html',
  styleUrls: ['./editar-escuela.component.css'],
})
export class EditarEscuelaComponent implements OnInit{
  public modeEdition: boolean;
  public escuela: EscuelaDto;
  public idFacultad: bigint;
  public facultades: Facultad[];
  public guardarButtonHabilitado: boolean;
  public editModeHabilitado: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facultadService: FacultadService,
    private escuelaService: EscuelaService,
    private datepipe: DatePipe,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.guardarButtonHabilitado = false;
    this.editModeHabilitado = false;
    this.escuela = new EscuelaDto();
    this.route.queryParams.subscribe((params) => {
      this.modeEdition = params.modeEdition == 'true';
    });
    this.obtenerTodasLasFacultades();
  }

  public obtenerTodasLasFacultades(): void {
    this.facultadService
      .obtenerTodasLasFacultades()
      .subscribe((response: Facultad[]) => {
        this.facultades = response;
      });
  }

  public buscarEscuela(idEscuela: string): void {
    this.escuela = new EscuelaDto();
    if (idEscuela != "" && idEscuela!= undefined) {
      this.escuelaService
        .obtenerEscuelaPorId(idEscuela)
        .subscribe((response: Escuela) => {
          if (response != null) {
            this.sendNotification(
              NotificationType.SUCCESS,
              `Escuela cargada exitosamente.`
            );
            this.guardarButtonHabilitado = true;
            this.editModeHabilitado = true;
            this.convertirResponseToEscuelaDto(response);
            this.idFacultad = response.facultad.idFacultad;
          } else {
            this.idFacultad = undefined;
            this.editModeHabilitado = false;
            this.guardarButtonHabilitado = false;
            this.escuela = new EscuelaDto();
            this.sendNotification(
              NotificationType.ERROR,
              `No se encontró ninguna escuela registrada con ese ID.`
            );
          }
        });
    } else {
      this.idFacultad = undefined;
      this.editModeHabilitado = false;
      this.guardarButtonHabilitado = false;
      this.escuela = new EscuelaDto();
      this.sendNotification(NotificationType.ERROR, `Ingrese ID.`);
    }
  }

  public convertirResponseToEscuelaDto(response:Escuela):void{
    this.escuela.cantidadAlumnos = response.cantidadAlumnos.toString();
    this.escuela.clasificacion = response.clasificacion.toString();
    this.escuela.fechaRegistro = this.convertirFormatoDeFecha(response.fechaRegistro);
    this.escuela.idEscuela = response.idEscuela.toString();
    this.escuela.idFacultad  = response.facultad.idFacultad.toString();
    this.escuela.licenciada = response.licenciada.toString();
    this.escuela.nombre = response.nombre;
    this.escuela.recursoFiscal = response.recursoFiscal.toString();
  }

  public guardarEscuela(escuela: EscuelaDto): void {
    this.corregirUndefinedValues(escuela);
      const formData = this.escuelaService.createEscuelaSaveFormData(
        escuela.idEscuela,
        escuela.nombre,
        escuela.cantidadAlumnos,
        escuela.recursoFiscal,
        escuela.licenciada,
        escuela.clasificacion,
        escuela.fechaRegistro,
        this.idFacultad.toString()
      );
      this.escuelaService.guardarEscuela(formData).subscribe(
        (response: Escuela) => {
          this.sendNotification(
            NotificationType.SUCCESS,
            `Escuela guardada exitosamente.`
          );
          this.router.navigate(['/']);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      );
  }
  corregirUndefinedValues(escuela: EscuelaDto) {
    if(escuela.cantidadAlumnos==undefined) escuela.cantidadAlumnos = "";
    if(escuela.recursoFiscal==undefined) escuela.recursoFiscal = "";
    if(escuela.clasificacion==undefined) escuela.clasificacion = "";
    if(escuela.idFacultad==undefined) escuela.idFacultad = "";
    if(escuela.fechaRegistro==undefined) escuela.fechaRegistro = "";
  }

  private convertirFormatoDeFecha(fechaPorConvertir: Date): string {
    return this.datepipe.transform(fechaPorConvertir, 'yyyy-MM-dd');
  }

  private sendNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'Ocurrió un error. Inténtalo de nuevo.'
      );
    }
  }
}
