import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutConfiguratorComponent } from '../layout-configurator/layout-configurator.component';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-layout-topbar',
  imports: [RouterModule, CommonModule, StyleClassModule, LayoutConfiguratorComponent],
  templateUrl: './layout-topbar.component.html',
  styleUrl: './layout-topbar.component.scss'
})
export class LayoutTopbarComponent {
     items!: MenuItem[];

        constructor(public layoutService: LayoutService) {}

        toggleDarkMode() {
            this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
        }

}
