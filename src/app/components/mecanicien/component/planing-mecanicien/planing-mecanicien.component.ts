import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute } from '@angular/router';
import { DetaildevisService } from '../../../../services/detaildevis/detaildevis.service';

@Component({
    selector: 'app-planing-mecanicien',
    imports: [CommonModule, InputTextModule,Dialog,Button],
    templateUrl: './planing-mecanicien.component.html',
    styleUrl: './planing-mecanicien.component.scss'
})
export class PlaningMecanicienComponent implements OnInit {
    id!: string;
    idrdv!: string;
    iddevis!: string;
    todo: any[] = [];
    inProgress: any[] = [];
    done: any[] = [];
    visibleencour : boolean = false;
    visibletermine : boolean = false;
    selectedTask: any = null;
  constructor(
    private route: ActivatedRoute,
    private detailDevis: DetaildevisService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.idrdv = params.get('idrdv')!;
      this.iddevis = params.get('iddevis')!;
    });
    this.loadTache();
    this.loadTacheEnCour();
    this.loadTacheTerminer();
  }
  loadTache(): void {
    this.detailDevis.getAllInfoTache(this.id).subscribe(data => {this.todo = data
      console.log(data);
    });
  }
  loadTacheEnCour(): void {
    this.detailDevis.getAllTacheEnCour(this.id).subscribe(data => {this.inProgress = data
      console.log(data);
    });
  }
  loadTacheTerminer(): void {
    this.detailDevis.getAllTacheTerminer(this.id).subscribe(data => {this.done = data
      console.log(data);
    });
  }

  openDialog(task: any) {
    this.selectedTask = task.tache._id;
    this.visibleencour = true;
  }
  openDialogTermine(task: any) {
    this.selectedTask = task.tache._id;
    this.visibletermine = true;
  }
  encour(id:string){
    this.detailDevis.UpdateTache(id,this.iddevis,{etat : 1}).subscribe(
        (response) => {
          console.log('Tâche mise à jour avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
        }
      );
      this.visibleencour = false;
      window.location.reload();
  }
  terminer(id:string){
    this.detailDevis.UpdateTache(id,this.iddevis,{etat : 2}).subscribe(
        (response) => {
          console.log('Tâche mise à jour avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
        }
      );
      this.visibletermine = false;
      window.location.reload();
  }

}
