import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './notification.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { ListarEscuelasComponent } from './component/listar-escuelas/listar-escuelas.component';
import { GuardarEscuelaComponent } from './component/guardar-escuela/guardar-escuela.component';
import { NotificationService } from './service/notification.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EditarEscuelaComponent } from './component/editar-escuela/editar-escuela.component';
@NgModule({
  declarations: [
    AppComponent,
    ListarEscuelasComponent,
    GuardarEscuelaComponent,
    NavbarComponent,
    EditarEscuelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
  ],
  providers: [NotificationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
