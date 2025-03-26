import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox'; // Assurez-vous d'importer CheckboxModule ici.
import { InputTextModule } from 'primeng/inputtext';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import {  ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-devis-general-client',
  imports: [CommonModule,ButtonModule, AccordionModule, InputTextModule, CheckboxModule, FormsModule,FooterClientComponent,TopbarClientComponent],
  templateUrl: './devis-general-client.component.html',
  styleUrls: ['./devis-general-client.component.scss']
})
export class DevisGeneralClientComponent {

    service: string[] = [
        "Vidange et changement d'huile",
        "Changement de plaquettes de frein",
        "Réparation et entretien ",
        "Diagnostic électronique",
        "Équilibrage/parallélisme pneus"
      ];

      tacheparservice = [
        {
          service: "Vidange et changement d'huile",
          taches: [
            { name: "Vidanger l'huile moteur", selected: false },
            { name: "Remplacer le filtre à huile", selected: false },
            { name: "Vérifier le niveau des autres fluides", selected: false },
            { name: "Contrôler l'état du bouchon de vidange", selected: false }
          ]
        },
        {
          service: "Changement de plaquettes de frein",
          taches: [
            { name: "Démonter les roues", selected: false },
            { name: "Retirer les anciennes plaquettes", selected: false },
            { name: "Installer les nouvelles plaquettes", selected: false },
            { name: "Vérifier le niveau du liquide de frein", selected: false },
            { name: "Faire un test de freinage", selected: false }
          ]
        }
      ];

      servicesSelectionnes: { [key: string]: boolean } = {};

      // Récupérer les tâches associées à un service
      getTachesForService(serviceName: string): any[] {
        const service = this.tacheparservice.find(s => s.service === serviceName);
        return service ? service.taches : [];
      }

      // Sélectionner/Désélectionner toutes les tâches d'un service
      toggleSelectionService(service: string) {
        const selected = this.servicesSelectionnes[service] || false;
        this.getTachesForService(service).forEach(tache => tache.selected = selected);
      }

      // Vérifier si toutes les tâches sont sélectionnées et mettre à jour la case principale
      onTacheSelectionne(service: string) {
        const taches = this.getTachesForService(service);
        this.servicesSelectionnes[service] = taches.every(t => t.selected);
      }
  constructor() { }
}
