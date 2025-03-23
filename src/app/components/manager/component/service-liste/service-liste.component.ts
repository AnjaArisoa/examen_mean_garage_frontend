import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Dialog } from 'primeng/dialog';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-service-liste',
  imports: [CommonModule,
      TableModule,
      ButtonModule,
      InputTextModule,
      InputNumberModule,
      Dialog,
      Select],
  templateUrl: './service-liste.component.html',
  styleUrl: './service-liste.component.scss'
})
export class ServiceListeComponent {
    donnee:any[]=[];
    test={nom :" Vidange",description:"Nettoyage",img:"/upload"};
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
    constructor() {
        this.ajouterTest();
      }

      ajouterTest() {
        this.donnee.push(this.test);
        console.log(this.donnee);
      }


      showDialogCheck() {
          this.visiblecheck = true;
      }
      showDialogNew() {
        this.visiblenew = true;
    }


}
