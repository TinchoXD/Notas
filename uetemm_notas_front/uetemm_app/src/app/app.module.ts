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
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
