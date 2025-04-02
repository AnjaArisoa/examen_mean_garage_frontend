import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { debounceTime, lastValueFrom, Subscription } from 'rxjs';
import { LayoutService } from '../../../../services/layout.service';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DetaildevisService } from '../../../../services/detaildevis/detaildevis.service';
import { DevisService } from '../../../../services/devis/devis.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard-chart-linear',
  imports: [CommonModule, ChartModule, FluidModule,CalendarModule,ButtonModule,FormsModule],
  templateUrl: './dashboard-chart-linear.component.html',
  standalone:true,
  styleUrl: './dashboard-chart-linear.component.scss'
})
export class DashboardChartLinearComponent {
    lineData: any;
    lineOptions: any;
    subscription: Subscription;
    devis:any[]=[]
    annee:string=""
        constructor(private layoutService: LayoutService,private devisService:DevisService) {
            this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
                this.initCharts();
            });
        }

        ngOnInit() {
            this.loadMecaRdv();
        }
        async loadMecaRdv() {
                try {
                    if(this.annee){
                        const selectedYear = new Date(this.annee).getFullYear();
                        this.devis = await lastValueFrom(this.devisService.getRevenue({params:{annee:selectedYear.toString()}}));
                        this.initCharts();
                    }
                    else{
                        const now=new Date()
                        const selectedYear = new Date(now).getFullYear();
                        this.devis = await lastValueFrom(this.devisService.getRevenue({params:{annee:selectedYear.toString()}}));
                        this.initCharts();
                    }

                } catch (error) {
                    console.error('Erreur lors de la récupération des RDV :', error);
                }
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
                        label: 'Revenu Total (MGA)',
                        data: this.devis,
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
