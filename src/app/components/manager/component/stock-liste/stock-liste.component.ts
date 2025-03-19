
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-stock-liste',
  imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        Select,
        Dialog
  ],
  templateUrl: './stock-liste.component.html',
  styleUrl: './stock-liste.component.scss'
})
export class StockListeComponent {
    donnee:any[]=[];
    test={nom :" Turbo-compresseur",modele:"BMW M340i xDrive",moteur:"Diesel",prix:"12000MGA",nombre:"2",type:"SUV"};
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

    constructor() {
        this.ajouterTest();
      }

      ajouterTest() {
        this.donnee.push(this.test);
        console.log(this.donnee);
      }
      visible: boolean = false;

      showDialog() {
          this.visible = true;
      }


}
