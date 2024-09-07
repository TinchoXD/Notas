import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { JwtInterceptoprService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { DialogoConfirmacionComponent } from './shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MaterialModule } from './material-module';
import { PrimeNGModule } from './primeng-modules';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AlertComponent } from './shared/alert/alert.component';
import { CUSTOM_DATE_FORMATS } from './services/matDateFormat/custom-date-formats';
import { AdministracionUsuariosComponent } from './pages/administracion-usuarios/administracion-usuarios.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './services/customPaginatorIntl/custom-paginator-intl';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { LoadingComponent } from './services/loading/loading.component';
import { LoadingService } from './services/loading/loading.service';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { AgregarCursoComponent } from './pages/curso/dialogo-curso/agregar-curso.component';
import { CursosComponent } from './pages/curso/curso/cursos.component';
import { AsyncPipe } from '@angular/common';
import { DialogoAsignaturaComponent } from './pages/asignatura/dialogo-asignatura/dialogo-asignatura.component';
import { AsignaturaComponent } from './pages/asignatura/asignatura/asignatura.component';
import { DialogoCursoProfesorComponent } from './pages/editar-usuario/dialogoCursoProfesor/dialogo-curso-profesor.component';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { EstudianteFormComponent } from './pages/estudiante/estudiante-form/estudiante-form.component';
import { AsignarCursoComponent } from './pages/estudiante/asignar-curso/asignar-curso.component';
import { DetalleCursoProfesorComponent } from './pages/detalle-curso-profesor/detalle-curso-profesor.component';
import { TutorComponent } from './pages/tutor/tutor.component';
import { DetalleCursoTutorComponent } from './pages/tutor/detalle-curso-tutor/detalle-curso-tutor.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    UserDetailsComponent,
    CambiarContrasenaComponent,
    DialogoConfirmacionComponent,
    NavMenuComponent,
    AlertComponent,
    AdministracionUsuariosComponent,
    EditarUsuarioComponent,
    LoadingComponent,
    AgregarUsuarioComponent,
    AgregarCursoComponent,
    CursosComponent,
    DialogoAsignaturaComponent,
    AsignaturaComponent,
    DialogoCursoProfesorComponent,
    MisCursosComponent,
    EstudianteComponent,
    EstudianteFormComponent,
    AsignarCursoComponent,
    DetalleCursoProfesorComponent,
    TutorComponent,
    DetalleCursoTutorComponent 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MaterialModule,
    OverlayModule,
    MatNativeDateModule,
    PrimeNGModule,
    FormsModule,
    AsyncPipe
  ],
  providers:
    [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptoprService, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
      { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
      { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
      { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
      { provide: LOCALE_ID, useValue: 'es' }, // Configuración de LOCALE_ID
      MessageService,
      LoadingService,
      provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
