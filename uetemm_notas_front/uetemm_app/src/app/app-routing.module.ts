import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/pages-profesor/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDetailsComponent } from './pages/pages-profesor/user-details/user-details.component';
import { CambiarContrasenaComponent } from './pages/pages-profesor/cambiar-contrasena/cambiar-contrasena.component';
import { AdministracionUsuariosComponent } from './pages/pages-profesor/administracion-usuarios/administracion-usuarios.component';
import { EditarUsuarioComponent } from './pages/pages-profesor/editar-usuario/editar-usuario.component';
import { CursosComponent } from './pages/pages-profesor/curso/curso/cursos.component';
import { AsignaturaComponent } from './pages/pages-profesor/asignatura/asignatura/asignatura.component';

import { authGuard } from './services/auth/auth.guard';
import { MisCursosComponent } from './pages/pages-profesor/mis-cursos/mis-cursos.component';
import { EstudianteComponent } from './pages/pages-profesor/estudiante/estudiante.component';
import { EstudianteFormComponent } from './pages/pages-profesor/estudiante/estudiante-form/estudiante-form.component';
import { DetalleCursoProfesorComponent } from './pages/pages-profesor/detalle-curso-profesor/detalle-curso-profesor.component';
import { TutorComponent } from './pages/pages-profesor/tutor/tutor.component';
import { DetalleCursoTutorComponent } from './pages/pages-profesor/tutor/detalle-curso-tutor/detalle-curso-tutor.component';
import { MisCalificacionesComponent } from './pages/pages-estudiante/calificaciones/mis-calificaciones/mis-calificaciones.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { InicioComponent } from './pages/pages-profesor/inicio/inicio.component';

const routes: Routes = [
 
 
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'estudiante/mis-calificaciones/:cedulaCodificada', component: MisCalificacionesComponent },
  
  //{ path: '**', component: PageNotFoundComponent },

  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio2', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'informacion-personal', component: UserDetailsComponent, canActivate: [authGuard] },
  { path: 'actualizar-contrasena', component: CambiarContrasenaComponent, canActivate: [authGuard] },
  { path: 'administracion-usuarios', component: AdministracionUsuariosComponent, canActivate: [authGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [authGuard] },
  { path: 'asignaturas', component: AsignaturaComponent, canActivate: [authGuard] },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [authGuard] },
  { path: 'mis-cursos', component: MisCursosComponent, canActivate: [authGuard] },
  { path: 'estudiantes', component: EstudianteComponent, canActivate: [authGuard] },
  { path: 'estudiantes/estudiante/:id', component: EstudianteFormComponent, canActivate: [authGuard] },
  { path: 'mis-cursos/curso/:id', component: DetalleCursoProfesorComponent, canActivate: [authGuard] },
  { path: 'cursos-tutor', component: TutorComponent, canActivate: [authGuard] },
  { path: 'notas-cursos/curso/:id', component: DetalleCursoTutorComponent, canActivate: [authGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: 'notfound', component: PageNotFoundComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '/notfound' },
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
