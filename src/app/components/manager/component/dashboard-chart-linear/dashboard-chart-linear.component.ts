import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../../services/layout.service';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-dashboard-chart-linear',
  imports: [CommonModule, ChartModule, FluidModule,CalendarModule,ButtonModule],
  templateUrl: './dashboard-chart-linear.component.html',
  standalone:true,
  styleUrl: './dashboard-chart-linear.component.scss'
})
export class DashboardChartLinearComponent {
    lineData: any;
    lineOptions: any;
    subscription: Subscription;
        constructor(private layoutService: LayoutService) {
            this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
                this.initCharts();
            });
        }

        ngOnInit() {
            this.initCharts();
        }
        initCharts() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            this.lineData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                        borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                        tension: 0.4
                    }
                ]
            };

            this.lineOptions = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
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
