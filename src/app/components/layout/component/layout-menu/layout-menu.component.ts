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
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['page/dashboard'] }]
            },
            {
                label: 'Stock',
                items: [{ label: 'Pieces', icon: 'pi pi-fw pi-heart', routerLink: ['page/stock/liste-stock'] },{ label: 'Commande Pieces', icon: 'pi pi-fw pi-heart', routerLink: ['page/stock/commande-pieces'] }]

            },


        ];
    }

}
