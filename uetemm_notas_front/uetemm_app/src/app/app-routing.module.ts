import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'informacion-personal', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
