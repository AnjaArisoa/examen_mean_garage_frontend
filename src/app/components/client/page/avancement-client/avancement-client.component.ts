import { DetaildevisService } from './../../../../services/detaildevis/detaildevis.service';
import { AuthService } from '../../../../services/authservice/auth.service';
import { RendezvousService } from '../../../../services/rdv/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-avancement-client',
    imports: [FooterClientComponent, TopbarClientComponent, TableModule, CommonModule, ProgressBar, InputTextModule],
    templateUrl: './avancement-client.component.html',
    styleUrl: './avancement-client.component.scss'
})
export class AvancementClientComponent implements OnInit {
    donne: any[] = [];
    tachesAvancement: any = {}; // Utilisation d'un objet pour associer IDDevis → Pourcentage

    constructor(
        private router: Router,
        private RendezvousService: RendezvousService,
        private AuthService: AuthService,
        private DetaildevisService: DetaildevisService
    ) { }

    ngOnInit(): void {
        this.loadRdv();
    }

    loadRdv(): void {
        const utilisateur: string = String(this.AuthService.getUserId());

        this.RendezvousService.getRdvByUser(utilisateur).subscribe(data => {
            if (Array.isArray(data) && data.length > 0) {
                this.donne = data; // Stocker les RDV récupérés
                this.tachesAvancement = {}; // Réinitialiser les avancements

                data.forEach(rdv => {
                    const idDevis = rdv._idDevis;

                    this.DetaildevisService.getTacheDevis(idDevis).subscribe(taches => {
                        if (Array.isArray(taches) && taches.length > 0) {
                            const totalTaches = taches.length;
                            const tachesTerminees = taches.filter(t => t.etat === 2).length;
                            const pourcentage = (tachesTerminees / totalTaches) * 100;

                            // Associer le pourcentage au devis correspondant
                            this.tachesAvancement[idDevis] = pourcentage.toFixed(2);
                        } else {
                            this.tachesAvancement[idDevis] = "0.00";
                        }

                        // Mettre à jour `donne` pour afficher le pourcentage directement
                        this.donne = this.donne.map(d => ({
                            ...d,
                            pourcentage: this.tachesAvancement[d._idDevis] || "0.00"
                        }));
                    });
                });
            } else {
                console.log("Aucun rendez-vous trouvé pour cet utilisateur.");
            }
        });
    }

    goToDetailAvancement(id:string) {
        this.router.navigate(['/detailavancement',id]);
    }

}
