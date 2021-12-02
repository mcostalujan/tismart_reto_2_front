import { ListarEscuelasComponent } from './component/listar-escuelas/listar-escuelas.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarEscuelaComponent } from './component/editar-escuela/editar-escuela.component';
import { EstadisticasComponent } from './component/estadisticas/estadisticas.component';
import { GuardarEscuelaComponent } from './component/guardar-escuela/guardar-escuela.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'index',
    component: ListarEscuelasComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'save',
    component: GuardarEscuelaComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'edit',
    component: EditarEscuelaComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'statistics',
    component: EstadisticasComponent, canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
