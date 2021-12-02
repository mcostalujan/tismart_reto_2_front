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

@Component({
  selector: 'app-guardar-escuela',
  templateUrl: './guardar-escuela.component.html',
  styleUrls: ['./guardar-escuela.component.css'],
})
export class GuardarEscuelaComponent implements OnInit {
  public modeEdition: boolean;
  public escuela: EscuelaDto;
  public facultades: Facultad[];
  public idFacultad:bigint;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facultadService: FacultadService,
    private escuelaService: EscuelaService,
    private datepipe: DatePipe,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
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
      console.log(escuela);
      if(this.idFacultad!=undefined){
        const formData = this.escuelaService.createEscuelaSaveFormData(
          this.escuela.idEscuela,
          escuela.nombre,
          escuela.cantidadAlumnos,
          escuela.recursoFiscal,
          escuela.licenciada,
          escuela.clasificacion,
          escuela.fechaRegistro,
          this.idFacultad.toString(),
        );
        this.escuelaService.guardarEscuela(formData).subscribe(
          (response: Escuela) => {
            this.sendNotification(
              NotificationType.SUCCESS,
              `Escuela guardada exitosamente.`
            );
            this.router.navigate(['/index']);
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(
              NotificationType.ERROR,
              errorResponse.error.message
            );
          }
        );
      }else{
        this.sendNotification(NotificationType.ERROR, `Seleccione Facultad.`);
      }
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
