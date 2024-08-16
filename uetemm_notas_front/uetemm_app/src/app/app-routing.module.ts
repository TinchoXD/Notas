import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { AdministracionUsuariosComponent } from './pages/administracion-usuarios/administracion-usuarios.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { EstudianteFormComponent } from './pages/estudiante/estudiante-form/estudiante-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },


  { path: 'inicio', component: DashboardComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'informacion-personal', component: UserDetailsComponent },
  { path: 'actualizar-contrasena', component: CambiarContrasenaComponent },
  { path: 'administracion-usuarios', component: AdministracionUsuariosComponent },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
  { path: 'estudiantes/estudiante', component: EstudianteFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
