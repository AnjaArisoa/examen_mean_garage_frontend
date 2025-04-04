import { AuthService } from './../../../../services/authservice/auth.service';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../../../../services/layout.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout-topbar',
  imports: [RouterModule, CommonModule, StyleClassModule,ButtonModule],
  templateUrl: './layout-topbar.component.html',
  styleUrl: './layout-topbar.component.scss'
})
export class LayoutTopbarComponent {
     items!: MenuItem[];

        constructor(public layoutService: LayoutService,private AuthService:AuthService,public router: Router) {}

        toggleDarkMode() {
            this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
        }
        logout(){
            this.AuthService.logout();
            this.router.navigate(['/login']);
        }

}
