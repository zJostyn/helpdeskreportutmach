import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'info', component: InfoComponent},
  {path: 'principal', children: [
    {path: 'dashboard', component: DashboardComponent, 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)} 
  ]}, 
  {path: '**', pathMatch: 'full', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
