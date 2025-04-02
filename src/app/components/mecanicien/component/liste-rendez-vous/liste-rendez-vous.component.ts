import { StockService } from './../../../../services/stock/stock.service';
import { PiecesService } from '../../../../services/pieces/pieces.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MacardvService } from '../../../../services/mecaRDV/macardv.service';
import { AuthService } from '../../../../services/authservice/auth.service';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
interface City {
    name: string;
    code: string;
}


@Component({
    selector: 'app-liste-rendez-vous',
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule,Dialog],
    templateUrl: './liste-rendez-vous.component.html',
    styleUrl: './liste-rendez-vous.component.scss'
})
export class ListeRendezVousComponent implements OnInit {
    pieces: any[] = []; // Variable pour stocker les pièces récupérées
    stock: any[] = [];
    errorMessage: string = ''; // Variable pour afficher un message d'erreur
    visible:boolean = false;
    isClicked: boolean = false;
    constructor(
        private router: Router,
        private MecaRdvService: MacardvService,
        private authService: AuthService,
        private PiecesService: PiecesService,
        private StockService: StockService) { }
    lsitrendezvous: any[] = [];

    ngOnInit(): void {
        // Vérifie dans le localStorage si le bouton doit être caché
        this.isClicked = localStorage.getItem('buttonClicked') === 'true';
        this.loadRendezvousmeca();
    }
    loadRendezvousmeca(): void {
        const utilisateur_storage: string = String(this.authService.getUserId());
        this.MecaRdvService.getRendezvousMecaWithCollab(utilisateur_storage).subscribe(data => {
            console.log(data); this.lsitrendezvous = data
        });
    }

    goToPlaningMecanicien(id: string, idrdv: string) {
        this.router.navigate(['mecanicien/planing/rendez-vous', id, idrdv]);
    }
    onButtonClick(event: Event, idDevis: string, idRdv: string) {
        event.stopPropagation();
        this.PiecesService.getPiecesByRdv(idRdv).subscribe((data) => {
            this.pieces = data;
            this.pieces.forEach(piece => {
                const idPiece = piece.pieces._id;
                const nombre = piece.nombre;
                const sorti = { pieces: idPiece, sortie: nombre };
                this.StockService.getStockByPiece(idPiece).subscribe((data) => {
                    this.stock = data;
                    // Calculer le total des entrées
                    const totalEntree = this.stock.reduce((sum, item) => sum + item.entree, 0);

                    // Calculer le total des sorties
                    const totalSortie = this.stock.reduce((sum, item) => sum + item.sortie, 0);

                    // Calculer le stock disponible (si nécessaire)
                    const stockDisponible = totalEntree - totalSortie;
                    if (stockDisponible < 0) {
                        this.errorMessage = 'stock insuffisant veillez informer le manager';
                        return
                    } else {
                        this.PiecesService.deleteByRdv(idRdv).subscribe(response => {});
                        this.StockService.addSorti(sorti).subscribe(
                            response => {
                                this.errorMessage = 'Vous pouvez commencer';
                            }
                        );
                        this.isClicked = true;
                        localStorage.setItem('buttonClicked', 'true');
                    }
                })
            });
        });
    }

}
