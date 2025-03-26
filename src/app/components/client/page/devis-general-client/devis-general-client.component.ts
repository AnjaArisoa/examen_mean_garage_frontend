import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox'; // Assurez-vous d'importer CheckboxModule ici.
import { InputTextModule } from 'primeng/inputtext';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import {  ButtonModule } from 'primeng/button';
import { SericesService } from '../../../../services/serices.service';

@Component({
  selector: 'app-devis-general-client',
  imports: [CommonModule,ButtonModule, AccordionModule, InputTextModule, CheckboxModule, FormsModule,FooterClientComponent,TopbarClientComponent],
  templateUrl: './devis-general-client.component.html',
  styleUrls: ['./devis-general-client.component.scss']
})
export class DevisGeneralClientComponent {
    servicestaches: any[] = [];
  servicesSelectionnes: { [key: string]: boolean } = {};

  constructor(private servicesService: SericesService) {}

  ngOnInit() {
    this.getServicesTaches();
  }

  // ✅ Récupérer les services et tâches dynamiquement depuis l'API
  getServicesTaches() {
    this.servicesService.getServicesTache().subscribe(
      data => {
        this.servicestaches = data;
      },
      error => {
        console.error('Erreur lors du chargement des services', error);
      }
    );
  }

  // ✅ Récupérer les tâches associées à un service donné
  getTachesForService(serviceName: string): any[] {
    const service = this.servicestaches.find(s => s.nom === serviceName);
    return service ? service.taches : [];
  }

  // ✅ Sélectionner/Désélectionner toutes les tâches d'un service
  toggleSelectionService(service: string) {
    const selected = this.servicesSelectionnes[service] || false;
    this.getTachesForService(service).forEach(tache => tache.selected = selected);
  }

  // ✅ Vérifier si toutes les tâches sont sélectionnées et mettre à jour la case principale
  onTacheSelectionne(service: string) {
    const taches = this.getTachesForService(service);
    this.servicesSelectionnes[service] = taches.every(t => t.selected);
  }

}
