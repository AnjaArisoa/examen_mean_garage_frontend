import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutMenuitemComponent } from '../layout-menuitem/layout-menuitem.component';

@Component({
    selector: 'app-layout-menu',
    imports: [CommonModule, LayoutMenuitemComponent, RouterModule],
    templateUrl: './layout-menu.component.html',
    styleUrl: './layout-menu.component.scss'
})
export class LayoutMenuComponent {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Planing Rendez vous',
                items: [{ label: 'Planing RDV', icon: 'pi pi-fw pi-calendar', routerLink: ['page/planing/calendrier'] }]
            },
            {
                label: 'Stock',
                items: [
                    { label: 'Pieces', icon: 'pi pi-fw pi-cog', routerLink: ['page/stock/liste-stock'] },
                    { label: 'Commande Pieces', icon: 'pi pi-fw pi-list', routerLink: ['page/stock/commande-pieces'] }
                ]
            },
            {
                label: 'Statistiques',
                items: [{ label: 'chart', icon: 'pi pi-fw pi-chart-line', routerLink: ['page/dashboard'] }]
            },

        ];
    }

}
