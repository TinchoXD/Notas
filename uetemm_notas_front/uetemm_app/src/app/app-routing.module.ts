import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { AdministracionUsuariosComponent } from './pages/administracion-usuarios/administracion-usuarios.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { CursosComponent } from './pages/curso/curso/cursos.component';
import { AsignaturaComponent } from './pages/asignatura/asignatura/asignatura.component';

import { authGuard } from './services/auth/auth.guard';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';

const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginComponent },
  
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'informacion-personal', component: UserDetailsComponent, canActivate: [authGuard] },
  { path: 'actualizar-contrasena', component: CambiarContrasenaComponent, canActivate: [authGuard] },
  { path: 'administracion-usuarios', component: AdministracionUsuariosComponent, canActivate: [authGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [authGuard] },
  { path: 'asignaturas', component: AsignaturaComponent, canActivate: [authGuard] },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [authGuard] },
  { path: 'mis-cursos', component: MisCursosComponent, canActivate: [authGuard] },
  { path: 'estudiantes', component: EstudianteComponent, canActivate: [authGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
