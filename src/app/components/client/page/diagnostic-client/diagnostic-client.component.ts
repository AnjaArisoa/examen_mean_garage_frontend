import { Component } from '@angular/core';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-diagnostic-client',
    imports: [FooterClientComponent,TopbarClientComponent,TableModule,CommonModule,InputTextModule,ButtonModule],
    templateUrl: './diagnostic-client.component.html',
    styleUrl: './diagnostic-client.component.scss'
})
export class DiagnosticClientComponent {
    donne: any[] = [];
    test = { daterdv: '10/03/2025', modele: 'BMW M5 competition', matriculation: '6870TBN', hd: '8h', hf: '12h', pourcentage: '40' };
    constructor(private router: Router) {
        this.ajouterTest();
    }
    ajouterTest() {
        this.donne.push(this.test);
    }

    goToDetailAvancement() {
        this.router.navigate(['/detailavancement']);
    }
}
