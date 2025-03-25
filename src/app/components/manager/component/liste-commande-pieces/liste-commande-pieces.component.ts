import { Component,OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Dialog } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { StockService } from '../../../../services/stock/stock.service';

@Component({
  selector: 'app-liste-commande-pieces',
  imports: [CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    Dialog,
    Select
],
  templateUrl: './liste-commande-pieces.component.html',
  styleUrl: './liste-commande-pieces.component.scss'
})
export class ListeCommandePiecesComponent implements OnInit{
    donnee:any[]=[];
    visiblecheck: boolean = false;
    visiblenew: boolean = false;
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
    constructor(private StockService: StockService) {

      }

    ngOnInit(): void {
        this.loadArticles();
    }
    loadArticles(): void {
        this.StockService.getStocks().subscribe(data => this.donnee =
            data);
    }

      showDialogCheck() {
          this.visiblecheck = true;
      }
      showDialogNew() {
        this.visiblenew = true;
    }

}
