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
import { DetaildevisService } from '../../../../services/detaildevis/detaildevis.service';
import { CategorievehiculeService } from '../../../../services/categorievehicule/categorievehicule.service';
import { lastValueFrom } from 'rxjs';
import { DureeTacheService } from '../../../../services/dureeTache/duree-tache.service';

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
    prixcat:number=0;
    lastdevis: any = null;


    constructor(public router: Router,
        private servicesService: SericesService,
        private piecesService: PiecesService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private DevisService: DevisService,
        private DetailDevis: DetaildevisService,
        private categorieVehiculeService:CategorievehiculeService,
        private dureeTacheService:DureeTacheService
    ) { }

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


async adddevis() {
    try {
        const utilisateur: string = String(this.authService.getUserId());
        // const newdevis = {
        //     utilisateur: utilisateur,
        //     categorieVehicule: this.categorieVehicule,
        //     modeleVehicule: this.modeleVehicule
        // };
        // const devisResponse = await lastValueFrom(this.DevisService.addDevis(newdevis));
        this.lastdevis = await lastValueFrom(this.DevisService.getLastDevis(utilisateur));
        if (!this.lastdevis) {
            console.error("Erreur : aucun devis trouvé !");
            return;
        }
        // 3️⃣ Récupérer les tâches sélectionnées
        this.tachesSelectionnees = this.getTachesSelectionnees();

        // 4️⃣ Parcourir chaque tâche
        for (const tache of this.tachesSelectionnees) {
            console.log("Tâche en cours :", tache);

            // 5️⃣ Récupérer les pièces liées à la tâche
            const piecesData = await lastValueFrom(
                this.piecesService.getPiecesTache(this.categorieVehicule, this.modeleVehicule, tache.id)
            );

            if (!piecesData || piecesData.length === 0) {
                console.log("Aucune pièce trouvée pour la tâche :", tache.id);
                continue; // Passer à la tâche suivante
            }

            // 6️⃣ Récupérer les infos de la catégorie véhicule
            const categorieData = await lastValueFrom(
                this.categorieVehiculeService.getByCategorie(this.categorieVehicule)
            );
            const dureTachee=await lastValueFrom(this.dureeTacheService.getDureeTache(tache.id));
            if (!categorieData) {
                console.error("Erreur : catégorie véhicule introuvable !");
                continue;
            }

            this.prixcat = categorieData.coefficient;
            const prix = (tache.prix * this.prixcat) / piecesData.length;
            const dureeTotalTache = (parseFloat(dureTachee.duree) + (parseFloat(dureTachee.duree) * (categorieData.coefficient - 1) * 0.3))/parseFloat(piecesData.length);
            // 7️⃣ Insérer les détails du devis pour chaque pièce
            // for (const piece of piecesData) {
            //     if (!piece.pieces) {
            //         console.error("Erreur : 'pieces' est manquant dans l'objet", piece);
            //         continue;
            //     }
            //     const prixPieces = piece.pieces.prix * 2;
            //     const prixTacheTotal = prix + prixPieces;
            //     const detaildevis = {
            //         devis: this.lastdevis,
            //         tache: tache.id,
            //         pieces: piece._id,
            //         prixTache: prixTacheTotal,
            //         dureTache:dureeTotalTache ,
            //         nombrePieces: 2
            //     };
            //     await lastValueFrom(this.DetailDevis.addDetailDevis(detaildevis));
            //     console.log("Détail de devis ajouté avec succès :", detaildevis);
            // }
        }
        // 8️⃣ Mettre à jour le devis après ajout des détails
        const somme=await lastValueFrom(this.DetailDevis.getSumDetailDevis(this.lastdevis._id))
        const updateDevis = {
            totalPrix: somme.totalPrixTache,
            nombreMecanicien: 2,
            totalHeure: somme.totalDureTache
        };
        await lastValueFrom(this.DevisService.updateDevis(this.lastdevis._id, updateDevis));
        console.log("Devis mis à jour avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'exécution de adddevis :", error);
    }
}


    makeRdv() {
        this.visiblerdv = true;
    }
}
