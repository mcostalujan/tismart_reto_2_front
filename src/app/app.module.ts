import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationModule } from './notification.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { ListarEscuelasComponent } from './component/listar-escuelas/listar-escuelas.component';
import { GuardarEscuelaComponent } from './component/guardar-escuela/guardar-escuela.component';
import { NotificationService } from './service/notification.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EditarEscuelaComponent } from './component/editar-escuela/editar-escuela.component';
import { EstadisticasComponent } from './component/estadisticas/estadisticas.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ListarEscuelasComponent,
    GuardarEscuelaComponent,
    NavbarComponent,
    EditarEscuelaComponent,
    EstadisticasComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [NotificationService, DatePipe, AuthenticationGuard, AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
