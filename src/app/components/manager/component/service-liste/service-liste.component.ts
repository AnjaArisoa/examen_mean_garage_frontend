import { Component,OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SericesService } from '../../../../services/serices.service';

@Component({
  selector: 'app-service-liste',
  imports: [CommonModule,
      TableModule,
      ButtonModule,
      InputTextModule,
      InputNumberModule,
      FormsModule,
      Dialog],
  templateUrl: './service-liste.component.html',
  styleUrl: './service-liste.component.scss'
})
export class ServiceListeComponent implements OnInit {
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
        newService = { nom: '', description: '',img:'' };
        services: any[] = [];
        visiblenew: boolean = false;
        constructor(private servicesService: SericesService) {
        }
        ngOnInit(): void {
            this.loadArticles();
        }
        loadArticles(): void {
            this.servicesService.getServices().subscribe(data => this.services =
                data);
        }
        deleteService(id: string): void {
            this.servicesService.deleteService(id).subscribe(() =>
                this.loadArticles());
        }
        addService(): void {
            if (this.newService.nom && this.newService.description&&this.newService.img) {
                this.servicesService.addService(this.newService).subscribe(() => {
                    this.loadArticles(); // Recharge la liste après ajout
                    this.newService = { nom: '', description: '',img:'' }; // Réinitialise le formulaire
                });
            }
        }

        visible: boolean = false;

        showDialogNew() {
            this.visiblenew = true;
        }

}
