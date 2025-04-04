
import { Component, input } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CategorievehiculeService } from '../../../../services/categorievehicule/categorievehicule.service';
import { ModelevehiculeService } from '../../../../services/modelevehiule/modelevehicule.service';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/authservice/auth.service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-topbar-client',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, Dialog, InputTextModule, Select, FormsModule,CommonModule],
    templateUrl: './topbar-client.component.html',
    styleUrl: './topbar-client.component.scss'
})
export class TopbarClientComponent {
    constructor(public router: Router, private modelevehiculeService: ModelevehiculeService, private categorieVehicule: CategorievehiculeService, private authService: AuthService) { }
    visible: boolean = false;
    modele: any[] = [];
    categorie: any[] = [];
    catv: string = "";
    modeleVehicule: string = '';
    clientrole: string = '';
    clientrolechek: boolean = false;
    goToSection(fragment: string) {
        this.router.navigate([''], { fragment: fragment });
    }

    showDialog() {
        const token = this.authService.getToken();
        const role = this.authService.getUserRole();
        if (!token || role!="client") {
            this.router.navigate(['/login']);
        } else {
            this.visible = true;
        }
    }
    goAvancement(){
        const token = this.authService.getToken();
        const role = this.authService.getUserRole();
        if (!token || role!="client") {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate([`/avancement`]);
        }
    }

    ngOnInit(): void {
        this.loadCategorie();
        this.loadModele();
        this.clientrole = this.authService.getUserRole()??'';
        if (this.clientrole == "client") {
            this.clientrolechek = true;
        }
    }

    loadCategorie(): void {
        this.categorieVehicule.getCategorieVehicule().subscribe(data => {
            console.log("Catégorie avant transformation:", data);

            this.categorie = data.map((item: any) => ({
                id: item._id,
                name: item.typeVehicule.nomTypeVehicule + "/" + item.typeMoteur.nomTypeMoteur // Vérifie le bon champ ici
            }));

            console.log("Catégorie après transformation:", this.categorie);
        });
    }

    loadModele(): void {
        if (!this.catv) {
            console.log("Aucune catégorie sélectionnée, chargement annulé.");
            return;
        }

        this.modelevehiculeService.getModeleVehiculeById(this.catv).subscribe(data => {
            this.modele = data.map((item: any) => ({
                id: item._id,
                name: item.modeleVehicule
            }));
            console.log("Modèle après transformation (filtré) :", this.modele);
        });
    }
    // Dans votre composant
    getPieces() {
        // Si les valeurs sont déjà récupérées dans catv et modeleVehicule
        const categorieVehicule = this.catv;
        const modeleVehicule = this.modeleVehicule;
        // Vérifiez que les deux paramètres sont définis
        if (categorieVehicule && modeleVehicule) {
            // Redirection avec les paramètres via la route
            this.router.navigate([`/devis/${categorieVehicule}/${modeleVehicule}`]);
        } else {
            console.error('Categorie ou modele non définis.');
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
