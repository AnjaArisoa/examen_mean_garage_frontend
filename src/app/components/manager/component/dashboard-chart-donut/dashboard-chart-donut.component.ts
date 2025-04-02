import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { debounceTime, lastValueFrom, Subscription } from 'rxjs';
import { LayoutService } from '../../../../services/layout.service';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DetaildevisService } from '../../../../services/detaildevis/detaildevis.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-chart-donut',
  imports: [CommonModule, ChartModule, FluidModule,CalendarModule,ButtonModule,FormsModule],
  templateUrl: './dashboard-chart-donut.component.html',
  standalone:true,
  styleUrl: './dashboard-chart-donut.component.scss'
})
export class DashboardChartDonutComponent {
    pieData: any;
    pieOptions: any;
    subscription: Subscription;
    tache:any[]=[]
    annee:string=""
    mois:string=""
        constructor(private layoutService: LayoutService,private detailDevisService:DetaildevisService) {
            this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
                this.initCharts();
            });
        }
        ngOnInit() {
            this.loadMecaRdv();
        }
        async loadMecaRdv() {
            try {
                if (this.annee && this.mois) {
                    const selectedYear = new Date(this.annee).getFullYear();
                    const selectedMonth = new Date(this.mois).getMonth() + 1;

                    console.log("Année:", selectedYear, "Mois:", selectedMonth);

                    // Appel de l'API en passant l'année et le mois
                    this.tache = await lastValueFrom(
                        this.detailDevisService.getTachePop({
                            params: {
                                annee: selectedYear.toString(),
                                mois: selectedMonth.toString()
                            }
                        })
                    );
                    this.initCharts();
                } else {
                    const now=new Date()
                    const selectedYear = new Date(now).getFullYear();
                    const selectedMonth = new Date(now).getMonth() + 1;
                    this.tache = await lastValueFrom(
                        this.detailDevisService.getTachePop({
                            params: {
                                annee: selectedYear.toString(),
                                mois: selectedMonth.toString()
                            }
                        })
                    );
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
            this.pieData = {
                labels: this.tache.map(taches => taches.tache),
                datasets: [
                    {
                        data: this.tache.map(taches => taches.count),
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
