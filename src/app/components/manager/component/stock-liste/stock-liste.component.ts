
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { StockService } from '../../../../services/stock/stock.service';
import { FormsModule } from '@angular/forms';
import { CommandepiecesService } from '../../../../services/commandePieces/commandepieces.service';
import { MessageService } from 'primeng/api';
import { PiecesService } from '../../../../services/pieces/pieces.service';
import { ModelevehiculeService } from '../../../../services/modelevehiule/modelevehicule.service';
import { MarquevehiculeService } from '../../../../services/marquevehicule/marquevehicule.service';
import { CategorievehiculeService } from '../../../../services/categorievehicule/categorievehicule.service';
import { TypemoteurService } from '../../../../services/typemoteur/typemoteur.service';
import { TypevehiculeService } from '../../../../services/typevehicule/typevehicule.service';

@Component({
    selector: 'app-stock-liste',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        Select,
        Dialog,
        FormsModule
    ],
    templateUrl: './stock-liste.component.html',
    styleUrl: './stock-liste.component.scss',
     providers: [MessageService]
})
export class StockListeComponent {
    donnee: any[] = [];
    modele:any[]=[];
    marque:any[]=[];
    categorie:any[]=[];
    typeV:any[]=[];
    typeM:any[]=[];
    visible: boolean = false;
    newCommande: any = { stockDifference: 1 };
    selectedItem: any = {};
    nomPiece: string = '';
  reference: string = '';
  modeleVehicule: string = '';
  marqueVehicule: string = '';
    catv:string="";
    constructor(private StockService: StockService,private commandePieces:CommandepiecesService,private messageService: MessageService, private modelevehiculeService: ModelevehiculeService,private marquevehiculeService:MarquevehiculeService,private categorieVehicule:CategorievehiculeService,private typeMoteur:TypemoteurService,private typevehicule:TypevehiculeService,private pieces:PiecesService) {
    }
    ngOnInit(): void {
        this.loadArticles();
        this.loadCategorie();
        this.loadMarque();
        this.loadModele();
    }
    loadArticles(): void {
        this.StockService.getStocks(this.nomPiece, this.reference, this.modeleVehicule, this.marqueVehicule, this.catv).subscribe(response => {
          if (response.success && response.data) {
            this.donnee = response.data;
            this.nomPiece = '';
            this.reference = '';
            this.modeleVehicule = '';
            this.marqueVehicule = '';
            this.catv = '';
          }
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
    saveCommande(): void {
        if (this.selectedItem ) {
          const commande = {
            pieces: this.selectedItem._id,
            nombre: this.newCommande.stockDifference
          };

          this.commandePieces.addCommandePiece(commande).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Commande ajoutée',
                detail: 'La commande a été enregistrée avec succès.',
                life: 3000
              });
              this.loadArticles(); // Rafraîchir la liste après ajout
              this.visible = false;
            },
            (error) => {
              console.error('Erreur lors de l\'ajout de la commande', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Échec de l\'ajout de la commande.',
                life: 3000
              });
            }
          );
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Quantité invalide',
            detail: 'Veuillez saisir une quantité valide.',
            life: 3000
          });
        }
        this.visible=false;
    }
    showDialog(item: any) {
        this.selectedItem = item; // Stocke l'élément cliqué
        this.visible = true;
    }


}
