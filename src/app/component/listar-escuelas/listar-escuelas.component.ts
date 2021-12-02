import { EscuelaService } from './../../service/escuela.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Escuela } from 'src/app/model/escuela';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';

@Component({
  selector: 'app-listar-escuelas',
  templateUrl: './listar-escuelas.component.html',
  styleUrls: ['./listar-escuelas.component.css'],
})
export class ListarEscuelasComponent implements OnInit {
  public listaEscuelas: Escuela[];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private escuelaService: EscuelaService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.listaEscuelas = [];
    this.obtenerTodasLasEscuelas();
  }

  public obtenerTodasLasEscuelas(): void {
    this.listaEscuelas = [];
    this.escuelaService
      .obtenerTodasLasEscuelas()
      .subscribe((response: Escuela[]) => {
        for (let value of response) {
          value.fechaConFormato = this.convertirFormatoDeFecha(
            value.fechaRegistro
          );
        }
        this.listaEscuelas = response;
      });
  }

  private convertirFormatoDeFecha(fechaPorConvertir: Date): string {
    return this.datepipe.transform(fechaPorConvertir, 'yyyy-MM-dd');
  }

  public eliminarEscuela(escuela: Escuela): void {
    if (
      confirm(
        '¿Está seguro de eliminar la escuela ' +
          escuela.nombre +
          ' del registro ?'
      )
    ) {
      this.escuelaService.eliminarEscuela(escuela.idEscuela).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.obtenerTodasLasEscuelas();
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      );
    }
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
