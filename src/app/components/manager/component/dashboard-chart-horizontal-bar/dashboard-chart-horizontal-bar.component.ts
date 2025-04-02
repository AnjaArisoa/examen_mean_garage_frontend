import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { debounceTime, lastValueFrom, Subscription } from 'rxjs';
import { LayoutService } from '../../../../services/layout.service';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { MacardvService } from '../../../../services/mecaRDV/macardv.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard-chart-horizontal-bar',
    standalone: true,
    imports: [CommonModule, ChartModule, FluidModule, CalendarModule, ButtonModule, FormsModule],
    templateUrl: './dashboard-chart-horizontal-bar.component.html',
    styleUrl: './dashboard-chart-horizontal-bar.component.scss'
})
export class DashboardChartHorizontalBarComponent {
    barData: any;
    subscription: Subscription;
    barOptions: any;
    rdv: any[] = [];
    annee: string = ""
    mois: string = ""

    constructor(private layoutService: LayoutService, private mecardvService: MacardvService) {
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
                this.rdv = await lastValueFrom(this.mecardvService.getMecaRdv({
                    params: {
                        annee: selectedYear.toString(),
                        mois: selectedMonth.toString()
                    }
                }));
                this.initCharts();
            }
            else {
                const now=new Date()
                const selectedYear = new Date(now).getFullYear();
                const selectedMonth = new Date(now).getMonth() + 1;
                this.rdv = await lastValueFrom(this.mecardvService.getMecaRdv({
                    params: {
                        annee: selectedYear.toString(),
                        mois: selectedMonth.toString()
                    }
                }));
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

        this.barData = {
            labels: this.rdv.map((meca: any) => meca.nom),
            datasets: [
                {
                    label: 'Nombre de RDV',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                    data: this.rdv.map((meca: any) => meca.totalRdv)
                }
            ]
        };

        this.barOptions = {
            indexAxis: 'y',
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
    }
}
