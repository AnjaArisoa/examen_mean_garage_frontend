import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-topbar-client',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
  templateUrl: './topbar-client.component.html',
  styleUrl: './topbar-client.component.scss'
})
export class TopbarClientComponent {
    constructor(public router: Router) {}
    goToSection(fragment: string) {
        this.router.navigate([''], { fragment: fragment });
    }
}
