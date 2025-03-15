import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-accueil-client',
  imports: [ButtonModule, RippleModule],
  templateUrl: './accueil-client.component.html',
  styleUrl: './accueil-client.component.scss'
})
export class AccueilClientComponent {
    constructor(public router: Router) {}
    goToFeatures() {
        this.router.navigate([''], { fragment: 'features' });
    }
}
