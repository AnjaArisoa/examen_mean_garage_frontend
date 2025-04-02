import { lastValueFrom } from 'rxjs';
import { RendezvousService } from './../../../../services/rdv/rendezvous.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planning-rendez-vous',
  imports: [CommonModule,AccordionModule,InputTextModule,Button, Dialog,FormsModule,],
  templateUrl: './planning-rendez-vous.component.html',
  styleUrl: './planning-rendez-vous.component.scss'
})
export class PlanningRendezVousComponent {
    heures: string[] = [];
    rendezvous :any[]=[]
    couleurs: string[] = ['bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200'];
    visible: boolean = false;
    detail: any = null;
    date:string="";



    constructor(private rendezvousService:RendezvousService) {
      for (let h = 8; h <= 18; h++) {
        this.heures.push(`${h.toString().padStart(2, '0')}:00`);
      }
    }
    ngOnInit(): void {
            this.getRendezVous();
      }
      async getRendezVous() {
        const params = this.date ? { date: this.date } : {};
        this.rendezvousService.getRendezvousManager({ params }).subscribe(
            async data => {
                this.rendezvous = data.map((rdv: any) => ({
                    ...rdv,
                    couleur: this.getRandomCouleur()
                }));
            },
            error => {
                console.error('Erreur lors du chargement des services', error);
            }
        );
    }


    getRandomCouleur(): string {
        return this.couleurs[Math.floor(Math.random() * this.couleurs.length)];
    }
    getRdvForHour(heure: string) {
        const hourNumber = parseInt(heure.split(':')[0], 10);
        return this.rendezvous.filter(rdv => {
            const rdvHour = parseInt(rdv.heuredebut.split(':')[0], 10);
            return rdvHour === hourNumber;
        });
    }

    getGridStyleForHour(heure: string): string {
      const rdvCount = this.getRdvForHour(heure).length;
      const rowCount = Math.ceil(rdvCount / 4); // 4 rendez-vous max par ligne
      return `grid-rows-${rowCount} grid-cols-${Math.min(4, rdvCount)}`;
    }
    async getDetailRendezVous(id:string){
        this.detail=await lastValueFrom(this.rendezvousService.getDetailRendezvousManager(id));
        this.Affiche();
    }
    Affiche(){
        this.visible=true;
    }


}
