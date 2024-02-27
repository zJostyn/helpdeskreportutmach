import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule } from '@angular/material/menu';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReportComponent } from './report/report.component';
import { MatCardModule } from '@angular/material/card';
import { SolutionComponent } from './solution/solution.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ReportComponent,
    SolutionComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
