import { CommandePiecesComponent } from './../../../manager/page/stock/commande-pieces/commande-pieces.component';
import { DevisService } from '../../../../services/devis/devis.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox'; // Assurez-vous d'importer CheckboxModule ici.
import { InputTextModule } from 'primeng/inputtext';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import { ButtonModule } from 'primeng/button';
import { SericesService } from '../../../../services/serices.service';
import { Dialog } from 'primeng/dialog';
import { PiecesService } from './../../../../services/pieces/pieces.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/authservice/auth.service';
import { DetaildevisService } from '../../../../services/detaildevis/detaildevis.service';
import { CategorievehiculeService } from '../../../../services/categorievehicule/categorievehicule.service';
import { lastValueFrom } from 'rxjs';
import { DureeTacheService } from '../../../../services/dureeTache/duree-tache.service';
import { RendezvousService } from '../../../../services/rdv/rendezvous.service';
import { CommandepiecesService } from '../../../../services/commandePieces/commandepieces.service';
import { MacardvService } from '../../../../services/mecaRDV/macardv.service';
import Swal from 'sweetalert2';

import { Drawer } from 'primeng/drawer';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


@Component({
    selector: 'app-devis-general-client',
    imports: [CommonModule,
        ButtonModule,
        AccordionModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        FooterClientComponent,
        TopbarClientComponent,
        Dialog,
        Drawer],
    templateUrl: './devis-general-client.component.html',
    styleUrls: ['./devis-general-client.component.scss']
})
export class DevisGeneralClientComponent implements OnInit {
    servicestaches: any[] = [];
    tachepieces: any[] = [];
    tachepiecesmodifier: any[] = [];
    servicesSelectionnes: { [key: string]: boolean } = {};
    pieces: any[] = [];
    visible: boolean = false;
    visiblenewdevis: boolean = false;
    visiblerdv: boolean = false;
    visiblerdvnew:boolean=false
    visibledevis: boolean = false;
    categorieVehicule: string = "";
    modeleVehicule: string = "";
    messagePieces: string = "";
    tachesParService: { [key: string]: any[] } = {}; // Stocker les tâches par service
    tachesSelectionnees: any[] = [];
    prixcat: number = 0;
    lastdevis: any = null;
    rdv = { daterdv: "", heurerdv: "" };
    rdv2 = { daterdv: "", heurerdv: "" };
    message: string = ""
    messageTrue: string = ""
    creneauxDisponibles: any[] = [];
    nombreMecanicien: number = 0;
    allTaches: any[] = []; // Stocker toutes les tâches
    selectedTache: any = null;
    user: any = null;
    lastdevis_pdf: any = null;
    detaildevisbyid: any[] = [];


    constructor(public router: Router,
        private servicesService: SericesService,
        private piecesService: PiecesService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private DevisService: DevisService,
        private DetailDevis: DetaildevisService,
        private categorieVehiculeService: CategorievehiculeService,
        private dureeTacheService: DureeTacheService,
        private RdvService: RendezvousService,
        private CommandePiecesServices: CommandepiecesService,
        private MecaRdvService: MacardvService
        private dureeTacheService: DureeTacheService

    ) { }

    getTachesSelectionnees(): any[] {
        let tachesSelectionnees: any[] = [];  // Déclaration de la variable
        // Filtre les tâches où selected est true et les ajoute à tachesSelectionnees
        tachesSelectionnees = this.allTaches.filter(tache => tache.selected === true);
        console.log(tachesSelectionnees);
        return tachesSelectionnees;
    }
    ngOnInit() {
        this.getServicesTaches(); // Charger les services
        this.route.params.subscribe(params => {
            this.categorieVehicule = params['categorieVehicule'];
            this.modeleVehicule = params['modeleVehicule'];
        });
    }
    async getServicesTaches() {
        this.servicesService.getServicesTache().subscribe(
            async data => {
                this.servicestaches = data;
                this.processServicesTaches(); // Remplit `tachesParService`
                await this.processAllTaches(); // Remplit `allTaches` et ajoute les pièces
            },
            error => {
                console.error('Erreur lors du chargement des services', error);
            }
        );
    }
    processServicesTaches() {
        this.servicestaches.forEach(service => {
            this.tachesParService[service.nom] = this.getTachesForService(service.nom);
        });
    }
    async processAllTaches() {
        this.allTaches = Object.values(this.tachesParService).flat();

        // Récupérer les pièces pour chaque tâche
        const promises = this.allTaches.map(async (tache) => {
            try {
                // Récupérer les pièces pour la tâche
                tache.pieces = await this.piecesService.getPiecesTache(this.categorieVehicule, this.modeleVehicule, tache.id).toPromise();

                // Ajouter nombreinitial à chaque pièce
                tache.pieces.forEach((piece: any) => {
                    // Assigner nombreinitial à piece.nombre
                    piece.nombreinitial = piece.nombre;
                });

            } catch (error) {
                console.error(`Erreur lors de la récupération des pièces pour la tâche ${tache.name}`, error);
                tache.pieces = []; // Si erreur, on met une liste vide
            }
        });

        // Attendre que toutes les requêtes soient terminées
        await Promise.all(promises);
    }
    getTachesForService(serviceName: string): any[] {
        const service = this.servicestaches.find(s => s.nom === serviceName);
        return service ? service.taches : [];
    }
    toggleSelectionService(service: string) {
        const selected = this.servicesSelectionnes[service] || false;
        this.getTachesForService(service).forEach(tache => tache.selected = selected);
    }
    onTacheSelectionne(service: string) {
        const taches = this.getTachesForService(service);
        this.servicesSelectionnes[service] = taches.every(t => t.selected);
    }
    // Modifiez modifiernombrepiece pour la rendre asynchrone
    async modifiernombrepiece(id: string) {
        // Trouver la tâche par ID dans allTaches
        this.selectedTache = this.allTaches.find(t => t.id === id) || null;

        if (this.selectedTache) {
            // Vérifier si elle contient des pièces
            if (this.selectedTache.pieces && this.selectedTache.pieces.length > 0) {
                this.messagePieces = ""; // Pas d'erreur
            } else {
                this.messagePieces = "Pas besoin de pieces pour cette tache.";
            }

            // Ouvrir la modale
            this.visible = true;
            console.log(this.selectedTache);
            return this.selectedTache;

        } else {
            console.error("Tâche non trouvée !");
        }
    }
    getDevis() {
        this.visiblenewdevis = true;
        console.log("alltache",this.allTaches);
        // this.getTachesSelectionnees();
    }
    // Méthode qui vérifie si tous les champs 'nombre' sont valides
    isDevisButtonDisabled(): boolean {
        return false;
    }
    isNombreInvalid(): boolean {
        // Vérifie que selectedTache et selectedTache.pieces sont définis et non null
        if (!this.selectedTache || !this.selectedTache.pieces) {
            return false; // Retourne false si selectedTache ou pieces est undefined ou null
        }
        // Vérifie si au moins une des pièces est invalide
        return this.selectedTache.pieces.some((piece: any) => {
            return piece.nombre < 1 || piece.nombre > piece.nombreinitial || !piece.nombre;
        });
    }
    closeDialog() {
        if (this.selectedTache && this.selectedTache.pieces) {
            this.selectedTache.pieces.forEach((piece: any) => {
                piece.nombre = piece.nombreinitial; // Réinitialise nombre à nombreinitial
            });
        }
        this.visible = false;
    }
    makeRdv() {
        this.visiblerdv = true;
    }
    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
    telechargerpdf() {
    const element = this.pdfContent.nativeElement;
    setTimeout(() => {
        html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // Largeur A4 en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('devis.pdf');
        });
    }, 1000); // Attendre 1 seconde pour s'assurer que l'image est chargée
    }

    async adddevis() {
        try {
            const utilisateur: string = String(this.authService.getUserId());
            const newdevis = {
                utilisateur: utilisateur,
                categorieVehicule: this.categorieVehicule,
                modeleVehicule: this.modeleVehicule
            };
            const devisResponse = await lastValueFrom(this.DevisService.addDevis(newdevis));
            this.lastdevis = await lastValueFrom(this.DevisService.getLastDevis(utilisateur));
            if (!this.lastdevis) {
                console.error("Erreur : aucun devis trouvé !");
                return;
            }
            // 3️⃣ Récupérer les tâches sélectionnées
            this.tachesSelectionnees = this.getTachesSelectionnees();
           var nombremeca = 0;
            // 4️⃣ Parcourir chaque tâche
            for (const tache of this.tachesSelectionnees) {
                console.log("Tâche en cours :", tache);

                // 5️⃣ Récupérer les pièces liées à la tâche

                console.log("valeur piece", tache.pieces);
                if (!tache.pieces || tache.pieces.length === 0) {
                    console.log("Aucune pièce trouvée pour la tâche :", tache.id);
                    continue; // Passer à la tâche suivante
                }

                // 6️⃣ Récupérer les infos de la catégorie véhicule
                const categorieData = await lastValueFrom(
                    this.categorieVehiculeService.getByCategorie(this.categorieVehicule)
                );
                const dureTachee = await lastValueFrom(this.dureeTacheService.getDureeTache(tache.id));
                if (!categorieData) {
                    console.error("Erreur : catégorie véhicule introuvable !");
                    continue;
                }

                this.prixcat = categorieData.coefficient;
                const prix = (tache.prix * this.prixcat) / tache.pieces.length;
                const dureeTotalTache = (parseFloat(dureTachee.duree) + (parseFloat(dureTachee.duree) * (categorieData.coefficient - 1) * 0.3)) / tache.pieces.length;
                // 7️⃣ Insérer les détails du devis pour chaque pièce
                for (const piece of tache.pieces) {
                    if (!piece.pieces) {
                        console.error("Erreur : 'pieces' est manquant dans l'objet", piece);
                        continue;
                    }
                    const prixPieces = piece.pieces.prix * 2;
                    const prixTacheTotal = prix + prixPieces;
                    const detaildevis = {
                        devis: this.lastdevis,
                        tache: tache.id,
                        pieces: piece.pieces._id,
                        prixTache: prixTacheTotal,
                        dureTache: dureeTotalTache,
                        nombrePieces: piece.nombre
                    };
                    await lastValueFrom(this.DetailDevis.addDetailDevis(detaildevis));
                    console.log("Détail de devis ajouté avec succès :", detaildevis);
                }
                nombremeca = nombremeca+tache.nombremeca;
            }
            var avgnombremeca = nombremeca/this.tachesSelectionnees.length;
            // Si avgnombremeca <= 1.5, on garde l'entier, sinon on prend l'entier supérieur
            var meca = avgnombremeca <= 1.5 ? Math.floor(avgnombremeca) : Math.ceil(avgnombremeca);
            // 8️⃣ Mettre à jour le devis après ajout des détails
            const somme = await lastValueFrom(this.DetailDevis.getSumDetailDevis(this.lastdevis._id));

            const updateDevis = {
                totalPrix: somme.totalPrixTache,
                nombreMecanicien: meca,
                totalHeure: somme.totalDureTache
            };
            await lastValueFrom(this.DevisService.updateDevis(this.lastdevis._id, updateDevis));
            console.log("Devis mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'exécution de adddevis :", error);
        }
        const utilisateur_storage: string = String(this.authService.getUserId());
        this.user = await lastValueFrom(this.authService.getUserById(utilisateur_storage));
        this.lastdevis_pdf = await lastValueFrom(this.DevisService.getLastDevis(utilisateur_storage));
        this.detaildevisbyid = await lastValueFrom(this.DetailDevis.getDetailDevisByIdDevis(this.lastdevis_pdf._id));
        this.visible = false;

    }
  
    async checkRendexVous() {
        const utilisateur: string = String(this.authService.getUserId());
        this.lastdevis = await lastValueFrom(this.DevisService.getLastDevis(utilisateur));
        const [heure, minutes] = this.rdv.heurerdv.split(":").map(Number);
        const heureDebutMinutes = heure * 60 + minutes;
        const heureTotalMinutes = heureDebutMinutes + this.lastdevis.totalHeure;
        const heureDebutTravail = 8 * 60; // 08:00 en minutes
        const heureFinTravail = 18 * 60; // 18:00 en minutes

        // Convertir heureTotalMinutes en HH:mm
        const heureFinHeure = Math.floor(heureTotalMinutes / 60);
        const heureFinMinutes = heureTotalMinutes % 60;
        let heureFin = `${String(heureFinHeure).padStart(2, "0")}:${String(heureFinMinutes).padStart(2, "0")}`;

        // Vérification si l'heure de fin dépasse 18:00 ou si l'heure de début est avant 08:00
        const [finHeure, finMinutes] = heureFin.split(":").map(Number);
        const heureFinEnMinutes = finHeure * 60 + finMinutes;
        const [debutHeure, debutMinutes] = this.rdv.heurerdv.split(":").map(Number);
        const heureDebutEnMinutes = debutHeure * 60 + debutMinutes;
        // Gérer l'ajout de jours à la date
        const dateRdv = new Date(this.rdv.daterdv);
        //dateRdv.setDate(dateRdv.getDate() + joursAjoutes); // Ajouter les jours nécessaires
        //dateRdv.setDate(dateRdv.getDate() );
        if (heureFinEnMinutes > heureFinTravail || heureDebutEnMinutes < heureDebutTravail) {
            // Si l'heure de fin dépasse 18:00 ou l'heure de début est avant 08:00
            this.message = "Veuillez choisir une autre date et une heure de début. L'heure de fin ne doit pas dépasser 18:00 et l'heure de début ne doit pas être avant 08:00.";
        }
        else{
            const data1 = {
                dateRdv: dateRdv.toISOString().split("T")[0], // Garder uniquement YYYY-MM-DD
                heureDebut: this.rdv.heurerdv,
                heureFin: heureFin
            };

            //check nombre meca dispo
            const checkMecaDispo = await lastValueFrom(this.RdvService.checkMecaDispo({ params: data1 }));
            const data2 = {
                nbrMecaDispo: checkMecaDispo.length,
                nbrDemande: this.lastdevis.nombreMecanicien,
                dateRdv: this.rdv.daterdv,
                heureDebut: this.rdv.heurerdv,
                heureFin: heureFin
            }
            //check Heure avec nombre meca dispo
            const checkHeureetMeca = await lastValueFrom(this.RdvService.checkMecaDispoetHeure({ params: data2 }))
            if (checkHeureetMeca.disponible) {
                const detaidevis = await lastValueFrom(this.DetailDevis.getByDetailDevis(this.lastdevis._id));
                const data3 = {
                    idDevis: this.lastdevis._id,
                    detailsDevis: detaidevis
                }
                //check stock et reservation pieces raha ampy
                const checkpieces = await lastValueFrom(this.RdvService.checkMecaEtPieces(data3))
                console.log(checkpieces);
                if (checkpieces.success == false) {
                    this.message = "Pieces insuffisantes";
                    console.log(checkpieces.piecesInsuffisantes);
                    this.visiblerdv = false;
                    // Affichage de l'alerte avec SweetAlert2
                    Swal.fire({
                        title: 'Stock insuffisant',
                        text: 'Voulez-vous commander les pièces manquantes ?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Oui, commander',
                        cancelButtonText: 'Non, annuler',
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            // Si l'utilisateur confirme la commande, on insère les pièces
                            for (const piece of checkpieces.piecesInsuffisantes) {
                                const data6 = {
                                    pieces: piece.pieces,
                                    nombre: piece.nombreDemande
                                };
                                //await lastValueFrom(this.CommandePiecesServices.addCommandePiece(data6));

                                console.log('Commande passée pour : ', data6);
                            }
                            Swal.fire('Commande effectuée', 'Les pièces manquantes ont été commandées.', 'success');
                            this.visiblerdvnew=true
                        } else {
                            Swal.fire('Annulé', 'Aucune pièce n\'a été commandée.', 'info');
                        }
                    });
                }

                else {

                    const rdv = {
                        _idUtilisateur: utilisateur,
                        _idDevis: this.lastdevis._id,
                        matriculation: "2564845AD",
                        daterdv: dateRdv.toISOString().split("T")[0],
                        heuredebut: this.rdv.heurerdv,
                        heurefin: heureFin,
                    }
                    await lastValueFrom(this.RdvService.addRDV(rdv));
                    const lastrdv = await lastValueFrom(this.RdvService.getLastRdv(utilisateur));
                    for (let i = 0; i < checkMecaDispo.length; i++) {
                        const meca = checkMecaDispo[i];
                        const data5 = {
                            _idrendezvous: lastrdv,
                            _idUtilisateur: meca._id
                        };
                        console.log(data5);
                        await lastValueFrom(this.MecaRdvService.addMecaRdv(data5));
                        if (i >= this.lastdevis.nombreMecanicien - 1) {
                            break;
                        }
                    }


                    for (const piece of checkpieces.reservation) {
                        const data4 = {
                            _rdv: lastrdv,
                            pieces: piece.pieces,
                            nombre: piece.nombre
                        }
                        await lastValueFrom(this.CommandePiecesServices.addReservationPiece(data4))
                    }
                    this.messageTrue = "Rendez-vous sauvegardé avec succès";

                }

            }
            else {
                this.creneauxDisponibles = checkHeureetMeca.creneau;
                this.message = checkHeureetMeca.message
            }
        }
    }
    async checkRendexVous2() {
        const utilisateur: string = String(this.authService.getUserId());
        this.lastdevis = await lastValueFrom(this.DevisService.getLastDevis(utilisateur));
        const [heure, minutes] = this.rdv2.heurerdv.split(":").map(Number);
        const heureDebutMinutes = heure * 60 + minutes;
        const heureTotalMinutes = heureDebutMinutes + this.lastdevis.totalHeure;
        const heureDebutTravail = 8 * 60; // 08:00 en minutes
        const heureFinTravail = 18 * 60; // 18:00 en minutes

        // Convertir heureTotalMinutes en HH:mm
        const heureFinHeure = Math.floor(heureTotalMinutes / 60);
        const heureFinMinutes = heureTotalMinutes % 60;
        let heureFin = `${String(heureFinHeure).padStart(2, "0")}:${String(heureFinMinutes).padStart(2, "0")}`;

        // Vérification si l'heure de fin dépasse 18:00 ou si l'heure de début est avant 08:00
        const [finHeure, finMinutes] = heureFin.split(":").map(Number);
        const heureFinEnMinutes = finHeure * 60 + finMinutes;
        const [debutHeure, debutMinutes] = this.rdv2.heurerdv.split(":").map(Number);
        const heureDebutEnMinutes = debutHeure * 60 + debutMinutes;
        // Gérer l'ajout de jours à la date
        const dateRdv = new Date(this.rdv2.daterdv);
        //dateRdv.setDate(dateRdv.getDate() + joursAjoutes); // Ajouter les jours nécessaires
        //dateRdv.setDate(dateRdv.getDate() );
        if(this.rdv2.daterdv>this.rdv2.daterdv){
            if (heureFinEnMinutes > heureFinTravail || heureDebutEnMinutes < heureDebutTravail) {
                // Si l'heure de fin dépasse 18:00 ou l'heure de début est avant 08:00
                this.message = "Veuillez choisir une autre date et une heure de début. L'heure de fin ne doit pas dépasser 18:00 et l'heure de début ne doit pas être avant 08:00.";
            }
            else{
                const data1 = {
                    dateRdv: dateRdv.toISOString().split("T")[0], // Garder uniquement YYYY-MM-DD
                    heureDebut: this.rdv2.heurerdv,
                    heureFin: heureFin
                };
                //check nombre meca dispo
                const checkMecaDispo = await lastValueFrom(this.RdvService.checkMecaDispo({ params: data1 }));
                const data2 = {
                    nbrMecaDispo: checkMecaDispo.length,
                    nbrDemande: this.lastdevis.nombreMecanicien,
                    dateRdv: this.rdv2.daterdv,
                    heureDebut: this.rdv2.heurerdv,
                    heureFin: heureFin
                }
                //check Heure avec nombre meca dispo
                const checkHeureetMeca = await lastValueFrom(this.RdvService.checkMecaDispoetHeure({ params: data2 }))
                if (checkHeureetMeca.disponible) {
                    const detaidevis = await lastValueFrom(this.DetailDevis.getByDetailDevis(this.lastdevis._id));
                    const data3 = {
                        idDevis: this.lastdevis._id,
                        detailsDevis: detaidevis
                    }
                    //check stock et reservation pieces raha ampy
                    const checkpieces = await lastValueFrom(this.RdvService.checkMecaEtPieces(data3))
                    console.log(checkpieces);

                        const rdv = {
                            _idUtilisateur: utilisateur,
                            _idDevis: this.lastdevis._id,
                            matriculation: "2564845AD",
                            daterdv: dateRdv.toISOString().split("T")[0],
                            heuredebut: this.rdv2.heurerdv,
                            heurefin: heureFin,
                        }
                        await lastValueFrom(this.RdvService.addRDV(rdv));
                        const lastrdv = await lastValueFrom(this.RdvService.getLastRdv(utilisateur));
                        for (let i = 0; i < checkMecaDispo.length; i++) {
                            const meca = checkMecaDispo[i];
                            const data5 = {
                                _idrendezvous: lastrdv,
                                _idUtilisateur: meca._id
                            };
                            console.log(data5);
                            await lastValueFrom(this.MecaRdvService.addMecaRdv(data5));
                            if (i >= this.lastdevis.nombreMecanicien - 1) {
                                break;
                            }
                        }


                        for (const piece of checkpieces.reservation) {
                            const data4 = {
                                _rdv: lastrdv,
                                pieces: piece.pieces,
                                nombre: piece.nombre
                            }
                            await lastValueFrom(this.CommandePiecesServices.addReservationPiece(data4))
                        }
                        this.messageTrue = "Rendez-vous sauvegardé avec succès";
                }
                else {
                    this.creneauxDisponibles = checkHeureetMeca.creneau;
                    this.message = checkHeureetMeca.message
                }
            }
        }
        else{
            this.message="Veuillez selectionner une date 2 jours apres le "+ this.rdv.daterdv
        }

    }
    makeRdv() {
        this.visiblerdv = true;
    }


}
