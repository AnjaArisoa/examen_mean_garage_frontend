
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
    styleUrl: './stock-liste.component.scss'
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

    selectedItem: any = {};
    constructor(private StockService: StockService) {
    }
    ngOnInit(): void {
        this.loadArticles();
    }
     loadArticles(): void {
        this.StockService.getStocks().subscribe(response => {
            console.log("Données reçues :", response); // Vérification des données
            if (response.success && response.data) {
                this.donnee = response.data; // Stocker uniquement `data`, qui est un tableau
            }
        });
    }
    showDialog(item: any) {
        this.selectedItem = item; // Stocke l'élément cliqué
        this.visible = true;
    }


}
