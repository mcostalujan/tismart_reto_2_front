import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Escuela } from 'src/app/model/escuela';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';
import { EscuelaService } from './../../service/escuela.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  public listaEscuelas: Escuela[];
  public filtroFecha: Date;
  public barChartImage: string;
  public pieChartImage: string;
  public statisticsHabilitado: boolean;
  private host = environment.apiUrl;
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private escuelaService: EscuelaService,
    private datepipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.listaEscuelas = [];
  }

  private convertirFormatoDeFecha(fechaPorConvertir: Date): string {
    return this.datepipe.transform(fechaPorConvertir, 'yyyy-MM-dd');
  }

  public buscarEscuelasPorFiltroFecha(): void {
    if (this.filtroFecha != undefined) {
      this.escuelaService
        .obtenerTodasLasEscuelasPorFecha(this.filtroFecha)
        .subscribe(
          (response: Escuela[]) => {
            if (response.length > 0) {
              this.statisticsHabilitado = true;
              this.sendNotification(
                NotificationType.SUCCESS,
                `Escuelas cargadas exitosamente.`
              );
              this.barChartImage =
                this.host +
                '/escuelas/exportar/barchart/alumnosPorEscuela/image/fecha/' +
                this.filtroFecha;
                this.pieChartImage =
                this.host +
                '/escuelas/exportar/piechart/alumnosPorEscuela/image/fecha/' +
                this.filtroFecha;
            } else {
              this.statisticsHabilitado = false;
              this.sendNotification(
                NotificationType.ERROR,
                `No existen registros con la fecha indicada. Revise la tabla general de escuelas registradas.`
              );
            }
            for (let value of response) {
              value.fechaConFormato = this.convertirFormatoDeFecha(
                value.fechaRegistro
              );
            }
            this.listaEscuelas = response;
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(
              NotificationType.ERROR,
              errorResponse.error.message
            );
          }
        );
    } else {
      this.statisticsHabilitado = false;
      this.sendNotification(NotificationType.ERROR, `Seleccione fecha.`);
    }
  }

  public limpiarFiltros(): void {
    this.statisticsHabilitado = false;
    this.listaEscuelas = [];
    this.filtroFecha = undefined;
  }

  public exportarTablaEscuelasPorFecha(): void {
    this.escuelaService
      .exportarEscuelasPorFechaRegistroTablaPDF(this.filtroFecha)
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'download.pdf';
        link.click();
      });
  }

  public exportarPieChartEscuelasPorFecha(): void {
    this.escuelaService
      .exportarEscuelasPorFechaRegistroPieChartPDF(this.filtroFecha)
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'download.pdf';
        link.click();
      });
  }

  public exportarBarChartEscuelasPorFecha(): void {
    this.escuelaService
      .exportarEscuelasPorFechaRegistroBarchartPDF(this.filtroFecha)
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'download.pdf';
        link.click();
      });
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
