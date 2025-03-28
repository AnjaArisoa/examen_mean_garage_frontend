import { DevisService } from '../../../../services/devis/devis.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox'; // Assurez-vous d'importer CheckboxModule ici.
import { InputTextModule } from 'primeng/inputtext';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import { ButtonModule } from 'primeng/button';
import { SericesService } from '../../../../services/serices.service';
import { Dialog } from 'primeng/dialog';
import { PiecesService } from './../../../../services/pieces/pieces.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/authservice/auth.service';

@Component({
    selector: 'app-devis-general-client',
    imports: [CommonModule,
        ButtonModule,
        AccordionModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        FooterClientComponent,
        TopbarClientComponent,
        Dialog],
    templateUrl: './devis-general-client.component.html',
    styleUrls: ['./devis-general-client.component.scss']
})
export class DevisGeneralClientComponent implements OnInit {
    servicestaches: any[] = [];
    tachepieces: any[] = [];
    servicesSelectionnes: { [key: string]: boolean } = {};
    pieces: any[] = [];
    visible: boolean = false;
    visiblenewdevis: boolean = false;
    visiblerdv: boolean = false;
    categorieVehicule: string = "";
    modeleVehicule: string = "";
    messagePieces: string = "";
    taches: any[] = [];
    tachesSelectionnees: any[] = [];
    lastdevis: any = null;


    constructor(public router: Router,
        private servicesService: SericesService,
        private piecesService: PiecesService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private DevisService: DevisService) { }

    getTachesSelectionnees(): any[] {
        let tachesSelectionnees: any[] = [];

        if (!Array.isArray(this.servicestaches)) {
            console.error("Erreur : `servicestaches` n'est pas un tableau", this.servicestaches);
            return [];
        }

        this.servicestaches.forEach(service => {
            if (!service || !Array.isArray(service.taches)) {
                console.warn(`Le service ${service?.nom || "inconnu"} n'a pas de tâches valides`, service);
                return;
            }

            const taches = (service.taches || []).filter((tache: any) => {
                if (!tache || typeof tache.selected === "undefined") {
                    console.warn("Une tâche mal formée a été trouvée :", tache);
                    return false;
                }
                return tache.selected;
            });

            tachesSelectionnees = [...tachesSelectionnees, ...taches];
        });

        return tachesSelectionnees;
    }
    ngOnInit() {
        this.getServicesTaches();
        // Récupérer les paramètres de l'URL
        this.route.params.subscribe(params => {
            this.categorieVehicule = params['categorieVehicule']; // Récupérer la catégorie du véhicule
            this.modeleVehicule = params['modeleVehicule']; // Récupérer le modèle du véhicule
        });
    }
    getServicesTaches() {
        this.servicesService.getServicesTache().subscribe(
            data => {
                this.servicestaches = data;
            },
            error => {
                console.error('Erreur lors du chargement des services', error);
            }
        );
    }
    getTachesForService(serviceName: string): any[] {
        const service = this.servicestaches.find(s => s.nom === serviceName);
        return service ? service.taches : [];
    }
    toggleSelectionService(service: string) {
        const selected = this.servicesSelectionnes[service] || false;
        this.getTachesForService(service).forEach(tache => tache.selected = selected);
    }
    onTacheSelectionne(service: string) {
        const taches = this.getTachesForService(service);
        this.servicesSelectionnes[service] = taches.every(t => t.selected);
    }
    modifiernombrepiece(id: string) {
        this.visible = true;

        // Réinitialiser le message avant de faire une nouvelle requête
        this.messagePieces = "";

        // Appel au service pour récupérer les pièces
        this.piecesService.getPiecesTache(this.categorieVehicule, this.modeleVehicule, id).subscribe(data => {
            console.log('Réponse des pièces:', data);
            // Mettre à jour les pièces de la tâche spécifique
            this.tachepieces = data;
        }, error => {
            // Si une erreur se produit, gérer le message
            this.tachepieces = [];  // Si erreur, s'assurer que tachepieces est vide
            this.messagePieces = "Pas besoin de pièces pour cette tâche.";
        });
    }
    getDevis() {
        this.visiblenewdevis = true;
    }
    adddevis() {
        const utilisateur: string = String(this.authService.getUserId());
        // // Construire l'objet newdevis avec les valeurs stockées
        // const newdevis = {
        //     utilisateur: utilisateur,
        //     categorieVehicule: this.categorieVehicule,
        //     modeleVehicule: this.modeleVehicule
        // };
        // //insert devis
        // this.DevisService.addDevis(newdevis).subscribe(response => {
        //     console.log("Devis ajouté avec succès :", response);
        // }, error => {
        //     console.error("Erreur lors de l'ajout du devis :", error);
        // });
        this.tachesSelectionnees = this.getTachesSelectionnees();
        //get l'id de ce devis
        this.DevisService.getLastDevis(utilisateur).subscribe(data => { console.log(data); this.lastdevis = data });

        //insert detail devis
        this.tachesSelectionnees.forEach(tache => {
            console.log("Tâche sélectionnée :", tache.id);
            this.piecesService.getPiecesTache(this.categorieVehicule, this.modeleVehicule, tache.id).subscribe(data => {
                console.log('Réponse des pièces:', data);
            });
        }
            //get duree dans dureetache
            //insert dans detaildevis
        );
    }

    makeRdv() {
        this.visiblerdv = true;
    }
}
