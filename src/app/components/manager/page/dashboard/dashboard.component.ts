import { DashboardKpiComponent } from './../../component/dashboard-kpi/dashboard-kpi.component';
import { Component } from '@angular/core';
//import { DashboardChartBarComponent } from '../../component/dashboard-chart-bar/dashboard-chart-bar.component';
import { DashboardChartDonutComponent } from '../../component/dashboard-chart-donut/dashboard-chart-donut.component';
import { DashboardChartLinearComponent } from '../../component/dashboard-chart-linear/dashboard-chart-linear.component';
import { DashboardChartHorizontalBarComponent } from '../../component/dashboard-chart-horizontal-bar/dashboard-chart-horizontal-bar.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-dashboard',
  imports: [DashboardKpiComponent,DashboardChartDonutComponent,DashboardChartLinearComponent,DashboardChartHorizontalBarComponent,InputTextModule,CalendarModule,ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
