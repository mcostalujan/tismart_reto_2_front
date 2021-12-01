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
  selector: 'app-editar-escuela',
  templateUrl: './editar-escuela.component.html',
  styleUrls: ['./editar-escuela.component.css']
})
export class EditarEscuelaComponent implements OnInit {

  public modeEdition: boolean;
  public escuela: Escuela;
  public facultad: bigint;
  public facultades: Facultad[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facultadService: FacultadService,
    private escuelaService: EscuelaService,
    private datepipe: DatePipe,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.escuela = new Escuela();
    this.escuela.facultad = new Facultad();
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

  public buscarEscuela(idEscuela: bigint): void{
    this.escuelaService.obtenerEscuelaPorId(idEscuela).subscribe(
      (response: Escuela) =>{
        this.sendNotification(
          NotificationType.SUCCESS,
          `Escuela cargada exitosamente.`
        );
        this.escuela = response;
        this.facultad = response.facultad.idFacultad;
      }
    )
  }

  public guardarEscuela(escuela: Escuela): void {
      console.log(escuela)
      escuela.fechaConFormato = this.convertirFormatoDeFecha(new Date());
      const formData = this.escuelaService.createEscuelaSaveFormData(
        this.escuela.idEscuela,
        escuela.nombre,
        escuela.cantidadAlumnos,
        escuela.recursoFiscal,
        escuela.licenciada,
        escuela.clasificacion,
        escuela.fechaConFormato,
        this.facultad
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
