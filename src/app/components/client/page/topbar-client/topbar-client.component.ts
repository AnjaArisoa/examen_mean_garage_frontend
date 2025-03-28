
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
@Component({
    selector: 'app-topbar-client',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, Dialog, InputTextModule, Select, FormsModule],
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

    ngOnInit(): void {
        this.loadCategorie();
        this.loadModele();
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
        this.modelevehiculeService.getModeleVehicule().subscribe(data => {
            console.log("Modèle avant transformation:", data);

            this.modele = data.map((item: any) => ({
                id: item._id,
                name: item.modeleVehicule // Assure-toi que c'est le bon champ
            }));

            console.log("Modèle après transformation:", this.modele);
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

}
