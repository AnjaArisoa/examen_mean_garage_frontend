
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
    modele = [
        { name: "Diesel" },
        { name: "Essence" }
    ];
    type = [
        { name: "SUV" },
        { name: "4x4" },
        { name: "Plaisir" },
        { name: "Camion" },
    ];
    visible: boolean = false;
    newCommande: any = { stockDifference: 1 };
    selectedItem: any = {};
    constructor(private StockService: StockService,private commandePieces:CommandepiecesService,private messageService: MessageService,) {
    }
    ngOnInit(): void {
        this.loadArticles();
    }
     loadArticles(): void {
        this.StockService.getStocks().subscribe(response => {
            //console.log("Données reçues :", response); // Vérification des données
            if (response.success && response.data) {
                this.donnee = response.data; // Stocker uniquement `data`, qui est un tableau
            }
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
