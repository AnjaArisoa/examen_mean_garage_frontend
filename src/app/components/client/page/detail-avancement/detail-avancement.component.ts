import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import { DetaildevisService } from '../../../../services/detaildevis/detaildevis.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-detail-avancement',
    imports: [FooterClientComponent, TopbarClientComponent,CommonModule],
    templateUrl: './detail-avancement.component.html',
    styleUrl: './detail-avancement.component.scss'
})
export class DetailAvancementComponent implements OnInit {
    id: string | null = null; // Stocke l'ID récupéré
    idrdv!: string;
    todo: any[] = [];
    inProgress: any[] = [];
    done: any[] = [];
    constructor(private route: ActivatedRoute,
        private detailDevis: DetaildevisService) { }

        ngOnInit(): void {
            this.route.paramMap.subscribe(params => {
                this.id = params.get('id');

                if (this.id) {  // Vérifier que l'ID est bien récupéré
                    console.log("ID récupéré :", this.id);
                    this.loadTache(this.id);
                    this.loadTacheEnCour(this.id);
                    this.loadTacheTerminer(this.id);
                } else {
                    console.error("ID non trouvé dans l'URL !");
                }
            });
        }
    loadTache(iddevis:string): void {
        this.detailDevis.getAllInfoTache(iddevis).subscribe(data => {
            this.todo = data
            console.log(data);
        });
    }
    loadTacheEnCour(iddevis:string): void {
        this.detailDevis.getAllTacheEnCour(iddevis).subscribe(data => {
            this.inProgress = data
            console.log(data);
        });
    }
    loadTacheTerminer(iddevis:string): void {
        this.detailDevis.getAllTacheTerminer(iddevis).subscribe(data => {
            this.done = data
            console.log(data);
        });
    }
}
