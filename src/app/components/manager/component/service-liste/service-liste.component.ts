import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SericesService } from '../../../../services/serices.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-service-liste',
    imports: [CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        FormsModule,
        Dialog,
        FileUpload],
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
    newService = { nom: '', description: '', img: '' };
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

    selectedFile: File | null = null;
    onFileSelected(event: any) {
        if (event.files.length > 0) {
            this.selectedFile = event.files[0]; // Stocke le fichier sélectionné
        }
    }

    addService(): void {
        if (this.newService.nom && this.newService.description && this.selectedFile) {
            const formData = new FormData();
            formData.append("nom", this.newService.nom);
            formData.append("description", this.newService.description);
            formData.append("img", this.selectedFile);

            this.servicesService.addService(formData).subscribe(() => {
                this.loadArticles(); // Recharge la liste après ajout
                this.newService = { nom: "", description: "",img: "" };
                this.selectedFile = null;
            });
        }
    }


    visible: boolean = false;

    showDialogNew() {
        this.visiblenew = true;
    }

}
