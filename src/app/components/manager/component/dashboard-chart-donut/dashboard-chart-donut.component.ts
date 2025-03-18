import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../../services/layout.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-dashboard-chart-donut',
  imports: [CommonModule, ChartModule, FluidModule,CalendarModule],
  templateUrl: './dashboard-chart-donut.component.html',
  standalone:true,
  styleUrl: './dashboard-chart-donut.component.scss'
})
export class DashboardChartDonutComponent {
    pieData: any;
    pieOptions: any;
    subscription: Subscription;
        constructor(private layoutService: LayoutService) {
            this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
                this.initCharts();
            });
        }
        initCharts() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            this.pieData = {
                labels: ['Révision', 'Vidange', 'Pneus'],
                datasets: [
                    {
                        data: [10, 50, 68],
                        backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-indigo-400'), documentStyle.getPropertyValue('--p-purple-400'), documentStyle.getPropertyValue('--p-teal-400')]
                    }
                ]
            };

            this.pieOptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };

        }
        ngOnDestroy() {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        }

}
