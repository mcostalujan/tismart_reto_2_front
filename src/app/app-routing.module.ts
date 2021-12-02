import { EstadisticasComponent } from './component/estadisticas/estadisticas.component';
import { EditarEscuelaComponent } from './component/editar-escuela/editar-escuela.component';
import { GuardarEscuelaComponent } from './component/guardar-escuela/guardar-escuela.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEscuelasComponent } from './component/listar-escuelas/listar-escuelas.component';

const routes: Routes = [
  {
    path:'',
    component:ListarEscuelasComponent,
  },
  {
    path:'save',
    component:GuardarEscuelaComponent,
  },
  {
    path:'edit',
    component:EditarEscuelaComponent,
  },
  {
    path:'statistics',
    component:EstadisticasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
