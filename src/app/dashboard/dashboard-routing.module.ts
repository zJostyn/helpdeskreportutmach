import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { ReportsComponent } from './reports/reports.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { ReportComponent } from './report/report.component';
import { SolutionComponent } from './solution/solution.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reportes', component: ReportsComponent},
  {path: 'reporte/:id', component: ReportComponent},
  {path: 'soluciones', component: SolutionsComponent},
  {path: 'solucion/:id', component: SolutionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
