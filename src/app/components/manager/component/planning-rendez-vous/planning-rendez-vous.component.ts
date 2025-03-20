import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-planning-rendez-vous',
  imports: [CommonModule,AccordionModule,InputTextModule,Button],
  templateUrl: './planning-rendez-vous.component.html',
  styleUrl: './planning-rendez-vous.component.scss'
})
export class PlanningRendezVousComponent {
    heures: string[] = [];
    rendezvous = [
      { client: "Jean Dupont", debut: "08:00", fin: "09:45", sujet: "Réunion de projet", couleur: "border-blue-500 bg-blue-100 text-blue-900" },
      { client: "Alice Martin", debut: "08:00", fin: "09:30", sujet: "Présentation produit", couleur: "border-green-500 bg-green-100 text-green-900" },
      { client: "Alice Martin", debut: "08:00", fin: "09:50", sujet: "Présentation produit", couleur: "border-green-500 bg-green-100 text-green-900" },
      { client: "Alice Martin", debut: "08:00", fin: "09:50", sujet: "Présentation produit", couleur: "border-green-500 bg-green-100 text-green-900" },
      { client: "Alice Martin", debut: "08:00", fin: "09:50", sujet: "Présentation produit", couleur: "border-green-500 bg-green-100 text-green-900" },
      { client: "Marie Curie", debut: "09:30", fin: "10:15", sujet: "Consultation", couleur: "border-purple-500 bg-purple-100 text-purple-900" }
    ];

    constructor() {
      for (let h = 8; h <= 18; h++) {
        this.heures.push(`${h.toString().padStart(2, '0')}:00`);
      }
    }

    getRdvForHour(heure: string) {
      return this.rendezvous.filter(rdv => rdv.debut.startsWith(heure) || rdv.fin.startsWith(heure));
    }
    getGridStyleForHour(heure: string): string {
      const rdvCount = this.getRdvForHour(heure).length;
      const rowCount = Math.ceil(rdvCount / 4); // 4 rendez-vous max par ligne
      return `grid-rows-${rowCount} grid-cols-${Math.min(4, rdvCount)}`;
    }

}
