import { MarquevehiculeService } from './../../../../services/marquevehicule/marquevehicule.service';
import { MediaDemo } from './../../../../pages/uikit/mediademo';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Dialog } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { CommandepiecesService } from '../../../../services/commandePieces/commandepieces.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ModelevehiculeService } from '../../../../services/modelevehiule/modelevehicule.service';
import { CategorievehiculeService } from '../../../../services/categorievehicule/categorievehicule.service';
import { TypemoteurService } from '../../../../services/typemoteur/typemoteur.service';
import { TypevehiculeService } from '../../../../services/typevehicule/typevehicule.service';
import { PiecesService } from '../../../../services/pieces/pieces.service';

@Component({
    selector: 'app-liste-commande-pieces',
    imports: [CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        Dialog,
        Select,
        FormsModule
    ],
    templateUrl: './liste-commande-pieces.component.html',
    styleUrl: './liste-commande-pieces.component.scss',
    providers: [MessageService]
})
export class ListeCommandePiecesComponent implements OnInit {
    donnee: any[] = [];
    visiblecheck: boolean = false;
    visiblenew: boolean = false;
    newArticle = {nomPiece:"",
    reference:"",
    categorieVehicule:"",
    marqueVehicule:"",
    modeleVehicule:"",
    prix:0 };
    modele:any[]=[];
    marque:any[]=[];
    categorie:any[]=[];
    typeV:any[]=[];
    typeM:any[]=[];
    selectedCommande: any = null;
    nombreArrive: number = 0;
    constructor(private commandePieces: CommandepiecesService, private messageservice: MessageService, private modelevehiculeService: ModelevehiculeService,private marquevehiculeService:MarquevehiculeService,private categorieVehicule:CategorievehiculeService,private typeMoteur:TypemoteurService,private typevehicule:TypevehiculeService,private pieces:PiecesService) {

    }

    ngOnInit(): void {
        this.loadArticles();
        this.loadCategorie();
        this.loadMarque();
        this.loadModele();
        this.loadTypeM();
        this.loadTypeV();
    }
    loadArticles(): void {
        this.commandePieces.getCommandePieces().subscribe(data => this.donnee =
            data);
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

    loadMarque(): void {
        this.marquevehiculeService.getMarqueVehicule().subscribe(data => {
            console.log("Marque avant transformation:", data);

            this.marque = data.map((item: any) => ({
                id: item._id,
                name:item.marqueVehicule // Vérifie si c'est bien la bonne clé
            }));

            console.log("Marque après transformation:", this.marque);
        });
    }

    loadCategorie(): void {
        this.categorieVehicule.getCategorieVehicule().subscribe(data => {
            console.log("Catégorie avant transformation:", data);

            this.categorie = data.map((item: any) => ({
                id: item._id,
                name: item.typeVehicule.nomTypeVehicule+"/"+item.typeMoteur.nomTypeMoteur // Vérifie le bon champ ici
            }));

            console.log("Catégorie après transformation:", this.categorie);
        });
    }

     loadTypeM(): void {
        this.typeMoteur.getTypeMoeteur().subscribe(data => {
            //console.log("Type Moteur avant transformation:", data);
            this.typeM = data.map((item: any) => ({
                id: item._id,
                name: item.nomTypeMoteur
            }));

            //console.log("Type Moteur après transformation:", this.typeM);
        });
    }
    loadTypeV(): void {
        this.typevehicule.getTypeVehicule().subscribe(data => {
            //console.log("Type Véhicule avant transformation:", data);
            this.typeV = data.map((item: any) => ({
                id: item._id,
                name: item.nomTypeVehicule
            }));

            //console.log("Type Véhicule après transformation:", this.typeV);
        });
    }
    addPiece(): void {
        if (
            this.newArticle.nomPiece &&
            this.newArticle.reference &&
            this.newArticle.categorieVehicule &&
            this.newArticle.marqueVehicule &&
            this.newArticle.modeleVehicule &&
            this.newArticle.prix > 0
        ) {
            console.log(this.newArticle)
            this.pieces.addPieces(this.newArticle).subscribe(() => {
                this.messageservice.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Articles added',
                    life: 3000
                });

                this.loadArticles();
                this.visiblenew = false;
                this.newArticle = {
                    nomPiece: '',
                    reference: '',
                    categorieVehicule: '',
                    marqueVehicule: '',
                    modeleVehicule: '',
                    prix: 0
                };
            });
        } else {
            this.messageservice.add({
                severity: 'error',
                summary: 'Validation Failed',
                detail: 'Please fill all required fields.',
                life: 3000
            });
        }
    }
    checkCommande(): void {
        if (!this.selectedCommande || this.nombreArrive <= 0) {
            this.messageservice.add({
                severity: 'warn',
                summary: 'Erreur',
                detail: 'Veuillez sélectionner une commande et saisir un nombre valide.',
                life: 3000
            });
            return;
        }
        console.log(this.selectedCommande)

        const data = { nombre: this.nombreArrive };

        this.commandePieces.check_commande(this.selectedCommande._id, data).subscribe({
            next: (response) => {
                this.messageservice.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Commande vérifiée avec succès.',
                    life: 3000
                });
                this.visiblecheck = false;
                this.loadArticles(); // Rafraîchir la liste des articles après la vérification
            },
            error: (err) => {
                console.error('Erreur lors de la vérification de la commande :', err);
                this.messageservice.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `Échec de la vérification : ${err.error.message || err.message}`,
                    life: 5000
                });
            }
        });
    }
    deleteCommande(id: string) {
        this.commandePieces.deleteCommandePiece(id).subscribe({
          next: () => {
            console.log('Commande supprimée avec succès');
            this.donnee = this.donnee.filter(item => item._id !== id);
          },
          error: (err) => console.error('Erreur lors de la suppression :', err),
        });
      }
    showDialogNew(): void {
        this.visiblenew = true;
    }
    showDialogCheck(commande: any): void {
        this.selectedCommande = commande;
        this.nombreArrive = 0;
        this.visiblecheck = true;
    }
  formatDate(dateString:any) {
    return dateString.replace('T', ' ').replace('Z', '');
  }

}
