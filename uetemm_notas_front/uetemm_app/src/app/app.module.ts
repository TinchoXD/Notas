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
import { MaterialIcon } from 'material-icons';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';


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
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptoprService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
