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
    constructor(private commandePieces: CommandepiecesService, private messageservice: MessageService) {

    }

    ngOnInit(): void {
        this.loadArticles();
    }
    loadArticles(): void {
        this.commandePieces.getCommandePieces().subscribe(data => this.donnee =
            data);
    }
    addPieces(): void {
        if (
            this.newArticle.nomPiece &&
            this.newArticle.reference &&
            this.newArticle.categorieVehicule &&
            this.newArticle.marqueVehicule &&
            this.newArticle.modeleVehicule &&
            this.newArticle.prix > 0 // Assure que prix est positif
        ) {
            this.commandePieces.addCommandePiece(this.newArticle).subscribe(() => {
                this.messageservice.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Articles added',
                    life: 3000
                });
                this.loadArticles(); // Recharge la liste après ajout
                this.visiblenew = false;
                // Réinitialiser l'objet `newArticle`
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
            // Si l'une des conditions n'est pas remplie, afficher un message d'erreur
            this.messageservice.add({
                severity: 'error',
                summary: 'Validation Failed',
                detail: 'Please fill all required fields.',
                life: 3000
            });
        }
    }

    showDialogCheck() {
        this.visiblecheck = true;
    }
    showDialogNew() {
        this.visiblenew = true;
    }

}
