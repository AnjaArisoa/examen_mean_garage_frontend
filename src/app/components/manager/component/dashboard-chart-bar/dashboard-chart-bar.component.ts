import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../../services/layout.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-dashboard-chart-bar',
  standalone: true,
  imports: [ChartModule,CalendarModule],
  templateUrl: './dashboard-chart-bar.component.html',
  styleUrl: './dashboard-chart-bar.component.scss'
})
export class DashboardChartBarComponent {
    barData: any;
    subscription: Subscription;
    barOptions: any;

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

            this.barData = {
                labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                        borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            };

            this.barOptions = {
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
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
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
        };
    }
