import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface City {
    name: string;
    code: string;
}


@Component({
  selector: 'app-liste-rendez-vous',
  imports: [CommonModule,InputTextModule,Button,Select,FormsModule],
  templateUrl: './liste-rendez-vous.component.html',
  styleUrl: './liste-rendez-vous.component.scss'
})
export class ListeRendezVousComponent implements OnInit {
    constructor( private router: Router) { }
    rendezvousList = [
        {
          heureDebut: '09:00',
          heureFin: '10:00',
          typeVehicule: 'Voiture',
          immatriculation: 'AB-123-CD',
          dateRendezvous: new Date(),
          service: 'Révision',
          status: 'Pending' // Peut être 'Completed', 'Pending', ou 'Cancelled'
        },
        {
          heureDebut: '10:30',
          heureFin: '11:30',
          typeVehicule: 'Camion',
          immatriculation: 'EF-456-GH',
          dateRendezvous: new Date(),
          service: 'Changement d huile',
          status: 'Completed' // Peut être 'Completed', 'Pending', ou 'Cancelled'
        },
        {
          heureDebut: '10:30',
          heureFin: '11:30',
          typeVehicule: 'Camion',
          immatriculation: 'EF-456-GH',
          dateRendezvous: new Date(),
          service: 'Changement d huile',
          status: 'Cancelled' // Peut être 'Completed', 'Pending', ou 'Cancelled'
        },
        // D'autres rendez-vous...
      ];

      cities: City[] | undefined;

      selectedCity: City | undefined;

      ngOnInit(): void {
        this.cities = [
            { name: 'Repparation', code: 'NY' },
            { name: 'Vidange', code: 'RM' },
            { name: 'Pneu', code: 'LDN' },
            { name: 'Electrique', code: 'IST' }
        ];
      }

      goToPlaningMecanicien() {
        this.router.navigate(['mecanicien/planing/rendez-vous']);
    }
}
